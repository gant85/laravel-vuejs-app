<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

/**
 * Handles authentication via Microsoft Entra ID (OIDC / OAuth 2.0).
 *
 * Flow (as per sequence-feat-login-users.puml):
 *  1. Browser is redirected to Entra ID.
 *  2. Entra ID calls back with an Auth Code.
 *  3. BFF exchanges the code for Access & Refresh Tokens.
 *  4. BFF decodes the JWT to read roles and groups claims.
 *  5. BFF checks the local DB:
 *     - User already exists  → update profile & claims (admin pre-provisioning path).
 *     - User does not exist  → JIT-provision a new local record.
 *  6. Tokens are stored encrypted in the DB (never sent to the browser).
 *  7. Laravel issues an HttpOnly session cookie to the Vue SPA.
 */
class AzureAuthController
{
    /**
     * Redirect the user to the Microsoft Entra ID authentication page.
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirectToAzure()
    {
        return Socialite::driver('azure')->redirect();
    }

    /**
     * Handle the callback from Microsoft Entra ID.
     *
     * Implements JIT provisioning and stores Entra claims (roles, groups)
     * locally so the BFF can make authorisation decisions without extra
     * Graph API calls on every request.
     */
    public function handleAzureCallback(): RedirectResponse
    {
        try {
            $azureUser = Socialite::driver('azure')->user();
        } catch (InvalidStateException $e) {
            Log::error('Entra ID authentication invalid state', ['exception' => $e]);

            return redirect()->route('login')
                ->withErrors(['error' => 'Authentication failed. Please try again.']);
        } catch (\Exception $e) {
            Log::error('Entra ID authentication error', ['exception' => $e]);

            return redirect()->route('login')
                ->withErrors(['error' => 'Authentication failed: '.$e->getMessage()]);
        }

        // Extract roles and groups from the access-token JWT claims.
        // Both claims are present only when "Group claims" and "App roles" are
        // configured on the Entra app registration manifest.
        $tokenClaims = $this->decodeTokenClaims($azureUser->token);
        $roles = $tokenClaims['roles'] ?? [];
        $groups = $tokenClaims['groups'] ?? [];

        Log::debug('Entra ID callback', [
            'azure_id' => $azureUser->getId(),
            'roles' => $roles,
            'groups' => $groups,
        ]);

        // Check whether the user was already proactively created by an administrator
        // (admin pre-provisioning path) or is logging in for the first time (JIT path).
        $existingUser = User::where('azure_id', $azureUser->getId())->first();

        if ($existingUser) {
            // Admin pre-provisioning path: update profile and refresh Entra claims.
            $existingUser->update([
                'name' => $azureUser->getName() ?? $azureUser->getEmail(),
                'email' => $azureUser->getEmail(),
                'avatar' => $azureUser->getAvatar(),
                'azure_token' => $azureUser->token,
                'azure_refresh_token' => $azureUser->refreshToken,
                'email_verified_at' => now(),
                'entra_roles' => $roles,
                'entra_groups' => $groups,
            ]);
            $user = $existingUser->fresh();
        } else {
            // JIT provisioning path: create a new local record for the Entra user.
            $user = User::create([
                'azure_id' => $azureUser->getId(),
                'name' => $azureUser->getName() ?? $azureUser->getEmail(),
                'email' => $azureUser->getEmail(),
                'avatar' => $azureUser->getAvatar(),
                'azure_token' => $azureUser->token,
                'azure_refresh_token' => $azureUser->refreshToken,
                'email_verified_at' => now(),
                'entra_roles' => $roles,
                'entra_groups' => $groups,
            ]);

            Log::info('JIT provisioning: new user created', ['user_id' => $user->id]);
        }

        // Issue a server-side Laravel session (HttpOnly cookie) to the SPA.
        // The raw Entra tokens are never exposed to the browser.
        Auth::login($user, true);

        return redirect()->intended('/');
    }

    /**
     * Log the user out of the application and invalidate the session.
     */
    public function logout(): RedirectResponse
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Decode the payload section of a JWT without verifying the signature.
     *
     * Signature verification is handled by Entra ID upstream; here we only
     * need to read the claims that were already validated during the OAuth
     * callback exchange.
     *
     * @return array<string, mixed>
     */
    private function decodeTokenClaims(string $jwt): array
    {
        $parts = explode('.', $jwt);

        if (count($parts) !== 3) {
            return [];
        }

        $payload = base64_decode(strtr($parts[1], '-_', '+/'));

        if ($payload === false) {
            return [];
        }

        return json_decode($payload, true) ?? [];
    }
}
