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

        // Find or create user
        $user = User::updateOrCreate(
            ['azure_id' => $azureUser->getId()],
            [
                'name' => $azureUser->getName() ?? $azureUser->getEmail(),
                'email' => $azureUser->getEmail(),
                'avatar' => $azureUser->getAvatar(),
                'azure_token' => $azureUser->token,
                'azure_refresh_token' => $azureUser->refreshToken,
                'email_verified_at' => now(), // Azure users are pre-verified
            ]
        );

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
