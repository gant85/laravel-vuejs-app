<?php

use App\Http\Controllers\Auth\AzureAuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Azure Entra ID Authentication Routes
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/auth/azure', [AzureAuthController::class, 'redirectToAzure'])->name('azure.login');
Route::get('/auth/azure/callback', [AzureAuthController::class, 'handleAzureCallback'])->name('azure.callback');
Route::post('/logout', [AzureAuthController::class, 'logout'])->name('logout');

// Protected Routes (require authentication)
Route::middleware(['auth'])->group(function () {
    // Dashboard - BFF Pattern Example
    // This route demonstrates how Laravel aggregates data from external APIs
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Admin APIs for Proactive User Provisioning
    Route::prefix('api/admin')->group(function () {
        Route::apiResource('users', AdminUserController::class);
    });
});
