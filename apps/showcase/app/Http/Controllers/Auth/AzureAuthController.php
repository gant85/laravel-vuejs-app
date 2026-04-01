<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

class AzureAuthController
{
    /**
     * Redirect the user to the Azure authentication page.
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirectToAzure()
    {
        return Socialite::driver('azure')->redirect();
    }

    /**
     * Handle the callback from Azure authentication.
     */
    public function handleAzureCallback(): RedirectResponse
    {
        try {
            $azureUser = Socialite::driver('azure')->user();
        } catch (InvalidStateException $e) {
            Log::error('Azure authentication invalid state', ['exception' => $e]);

            return redirect()->route('login')->withErrors(['error' => 'Authentication failed. Please try again.']);
        } catch (\Exception $e) {
            Log::error('Azure authentication error', ['exception' => $e]);

            return redirect()->route('login')->withErrors([
                'error' => 'Authentication failed: '.$e->getMessage(),
            ]);
        }

        $entraClaims = $this->extractClaims($azureUser->user);
        $entraId = $azureUser->getId() ?: Arr::get($entraClaims, 'oid') ?: Arr::get($entraClaims, 'sub');
        $email = $azureUser->getEmail() ?: Arr::get($entraClaims, 'mail') ?: Arr::get($entraClaims, 'preferred_username');

        if (! $entraId || ! $email) {
            Log::warning('Entra callback missing required identity fields', [
                'has_entra_id' => (bool) $entraId,
                'has_email' => (bool) $email,
            ]);

            return redirect()->route('login')->withErrors([
                'error' => 'Authentication failed: required identity claims are missing.',
            ]);
        }

        $groups = $this->extractArrayClaim($entraClaims, ['groups', 'roles']);
        $roles = $this->extractArrayClaim($entraClaims, ['app_roles', 'roles']);

        $user = User::query()
            ->where('azure_id', $entraId)
            ->orWhere('email', $email)
            ->first();

        $isJitProvisioning = false;

        if (! $user) {
            $user = new User;
            $isJitProvisioning = true;
            $user->provisioning_source = 'jit';
        } elseif (! $user->azure_id) {
            // User pre-provisioned by admin flow: link local profile to Entra identity.
            $user->provisioning_source = $user->provisioning_source ?: 'admin';
        }

        $user->fill([
            'azure_id' => $entraId,
            'name' => $azureUser->getName() ?? $email,
            'email' => $email,
            'avatar' => $azureUser->getAvatar(),
            'azure_token' => $azureUser->token,
            'azure_refresh_token' => $azureUser->refreshToken,
            'entra_groups' => $groups,
            'entra_roles' => $roles,
            'last_login_at' => now(),
            'last_login_ip' => request()->ip(),
            'email_verified_at' => $user->email_verified_at ?? now(),
        ]);

        $user->save();

        if ($isJitProvisioning) {
            Log::info('User provisioned with JIT flow', [
                'user_id' => $user->id,
                'entra_id' => $entraId,
            ]);
        }

        Auth::login($user, true);

        return redirect()->intended('/');
    }

    /**
     * Log the user out of the application.
     */
    public function logout(): RedirectResponse
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * @return array<string, mixed>
     */
    private function extractClaims(mixed $claims): array
    {
        return is_array($claims) ? $claims : [];
    }

    /**
     * @param  array<string, mixed>  $claims
     * @param  array<int, string>  $candidateKeys
     * @return array<int, string>
     */
    private function extractArrayClaim(array $claims, array $candidateKeys): array
    {
        foreach ($candidateKeys as $key) {
            $value = Arr::get($claims, $key);

            if (! is_array($value)) {
                continue;
            }

            return array_values(array_filter($value, fn (mixed $item): bool => is_string($item) && $item !== ''));
        }

        return [];
    }
}
