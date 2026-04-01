<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::table('users', function (Blueprint $table) {
      $table->text('azure_token')->nullable()->change();
      $table->text('azure_refresh_token')->nullable()->change();
    });
  }

  public function down(): void
  {
    Schema::table('users', function (Blueprint $table) {
      $table->text('azure_token')->nullable(false)->change();
      $table->text('azure_refresh_token')->nullable(false)->change();
    });
  }
};
