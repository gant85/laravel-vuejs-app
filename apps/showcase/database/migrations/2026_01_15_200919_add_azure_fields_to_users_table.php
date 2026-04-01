<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('azure_id')->nullable()->unique()->after('id');
            $table->string('azure_token')->nullable()->after('password');
            $table->string('azure_refresh_token')->nullable()->after('azure_token');
            $table->text('avatar')->nullable()->after('email');
            $table->string('password')->nullable()->change(); // Make password nullable for Azure users
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['azure_id', 'azure_token', 'azure_refresh_token', 'avatar']);
            $table->string('password')->nullable(false)->change();
        });
    }
};
