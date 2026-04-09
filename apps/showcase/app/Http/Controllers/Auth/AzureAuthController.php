<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
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

        Log::debug('logged in Azure user', ['user' => $azureUser]);

        $email = $azureUser->getEmail();
        $azureId = $azureUser->getId();

        // 1. Prioritize linking by azure_id
        $user = User::where('azure_id', $azureId)->first();

        // 2. Fallback to email for admin pre-provisioned records
        if (! $user && $email) {
            $user = User::where('email', $email)->first();
        }

        // 3. If User Does Not Exist (New user in portal) -> JIT Provisioning
        if (! $user) {
            $user = new User();
            $user->email = $email;
            $user->provisioning_source = 'jit';
        }

        $user->azure_id = $azureId;
        $user->name = $azureUser->getName() ?? $email;
        $user->avatar = $azureUser->getAvatar();
        $user->azure_token = $azureUser->token;
        $user->azure_refresh_token = $azureUser->refreshToken;
        $user->email_verified_at = $user->email_verified_at ?? now();
        
        // Save Entra authorization snapshot
        $user->entra_roles = $azureUser->user['roles'] ?? [];
        $user->entra_groups = $azureUser->user['groups'] ?? [];
        
        $user->save();

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
}
