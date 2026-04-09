<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds Entra ID group memberships and app-role assignments so the BFF
     * can read them on every request without hitting the Graph API again.
     * These are refreshed on every login (JIT provisioning).
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Array of Entra group display-names or object-IDs from the token "groups" claim
            $table->json('entra_groups')->nullable()->after('azure_refresh_token');
            // Array of app-role values from the token "roles" claim (e.g. ["Hospital.User", "SuperUser"])
            $table->json('entra_roles')->nullable()->after('entra_groups');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['entra_groups', 'entra_roles']);
        });
    }
};
