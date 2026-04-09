<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MicrosoftGraphService
{
    protected string $tenantId;
    protected string $clientId;
    protected string $clientSecret;
    protected string $graphApiVersion = 'v1.0';

    public function __construct()
    {
        $this->tenantId = config('services.azure.tenant', env('AZURE_TENANT_ID', 'common'));
        $this->clientId = config('services.azure.client_id', env('AZURE_CLIENT_ID'));
        $this->clientSecret = config('services.azure.client_secret', env('AZURE_CLIENT_SECRET'));
    }

    /**
     * Get an App-Only Access Token for Microsoft Graph UI.
     */
    public function getAppOnlyToken(): ?string
    {
        $url = "https://login.microsoftonline.com/{$this->tenantId}/oauth2/v2.0/token";

        $response = Http::asForm()->post($url, [
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'scope' => 'https://graph.microsoft.com/.default',
            'grant_type' => 'client_credentials',
        ]);

        if ($response->successful()) {
            return $response->json('access_token');
        }

        Log::error('Failed to obtain Microsoft Graph token', ['response' => $response->body()]);
        return null;
    }

    /**
     * Create/Invite a user explicitly (Proactive Management)
     * Here we send an invitation so they can login.
     */
    public function inviteUser(string $email, string $name, string $redirectUrl = 'https://localhost'): ?array
    {
        $token = $this->getAppOnlyToken();
        if (!$token) return null;

        $response = Http::withToken($token)
            ->post("https://graph.microsoft.com/{$this->graphApiVersion}/invitations", [
                'invitedUserEmailAddress' => $email,
                'invitedUserDisplayName' => $name,
                'sendInvitationMessage' => true,
                'inviteRedirectUrl' => $redirectUrl,
            ]);

        if ($response->successful()) {
            return $response->json();
        }

        Log::error('Failed to invite user via Graph API', ['response' => $response->body()]);
        return null;
    }

    /**
     * Assign a user to a specific Microsoft Entra Group
     */
    public function assignUserToGroup(string $userId, string $groupId): bool
    {
        $token = $this->getAppOnlyToken();
        if (!$token) return false;

        $response = Http::withToken($token)
            ->post("https://graph.microsoft.com/{$this->graphApiVersion}/groups/{$groupId}/members/\$ref", [
                '@odata.id' => "https://graph.microsoft.com/{$this->graphApiVersion}/directoryObjects/{$userId}"
            ]);

        if ($response->successful()) {
            return true;
        }

        Log::error('Failed to assign user to group', ['response' => $response->body()]);
        return false;
    }

    /**
     * Remove user from Microsoft Entra Group
     */
    public function removeUserFromGroup(string $userId, string $groupId): bool
    {
        $token = $this->getAppOnlyToken();
        if (!$token) return false;

        $response = Http::withToken($token)
            ->delete("https://graph.microsoft.com/{$this->graphApiVersion}/groups/{$groupId}/members/{$userId}/\$ref");

        if ($response->successful()) {
            return true;
        }

        Log::error('Failed to remove user from group', ['response' => $response->body()]);
        return false;
    }

    /**
     * Delete or disable user based on User ID
     */
    public function deleteUser(string $userId): bool
    {
        $token = $this->getAppOnlyToken();
        if (!$token) return false;

        $response = Http::withToken($token)
            ->delete("https://graph.microsoft.com/{$this->graphApiVersion}/users/{$userId}");

        if ($response->successful()) {
            return true;
        }

        Log::error('Failed to delete user', ['response' => $response->body()]);
        return false;
    }
}
