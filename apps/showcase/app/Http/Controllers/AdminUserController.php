<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\MicrosoftGraphService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminUserController
{
    protected MicrosoftGraphService $graphService;

    public function __construct(MicrosoftGraphService $graphService)
    {
        $this->graphService = $graphService;
    }

    /**
     * Display a listing of the users.
     */
    public function index(): JsonResponse
    {
        $users = User::all();

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage (Proactive User Management).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'base_group' => 'required|string',   // Example: ID of "Ospedaliero-Users"
            'order_group' => 'nullable|string',  // Example: ID of "OrderEnabled"
            'facilities' => 'nullable|array',
        ]);

        // 1. Send Invitation via Graph API
        $invitation = $this->graphService->inviteUser(
            $validated['email'],
            $validated['name'],
            config('app.url').'/login'
        );

        if (! $invitation) {
            return response()->json(['error' => 'Failed to invite user via Entra ID'], 500);
        }

        $invitedUserId = $invitation['invitedUser']['id'] ?? null;

        if ($invitedUserId) {
            // 2. Assign base Group
            $this->graphService->assignUserToGroup($invitedUserId, $validated['base_group']);

            // 3. Assign order group if selected
            if (! empty($validated['order_group'])) {
                $this->graphService->assignUserToGroup($invitedUserId, $validated['order_group']);
            }
        }

        // 4. Save user locally (Bypasses future JIT check)
        $user = new User;
        $user->email = $validated['email'];
        $user->name = $validated['name'];
        $user->azure_id = $invitedUserId;
        $user->provisioning_source = 'proactive';
        $user->entra_groups = array_filter([
            $validated['base_group'],
            $validated['order_group'] ?? null,
        ]);

        $user->save();

        return response()->json(['message' => 'User added successfully', 'user' => $user], 201);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'new_group' => 'required|string',
            'old_group' => 'required|string',
        ]);

        if ($user->azure_id) {
            // Remove from old group
            $this->graphService->removeUserFromGroup($user->azure_id, $validated['old_group']);
            // Add to new group
            $this->graphService->assignUserToGroup($user->azure_id, $validated['new_group']);
            // Note: The Entra Token will invalidate automatically because group memberships changed
        }

        return response()->json(['message' => 'User updated successfully']);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        if ($user->azure_id) {
            $this->graphService->deleteUser($user->azure_id);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
