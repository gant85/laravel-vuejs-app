<?php

namespace App\Http\Controllers;

use App\Services\ExternalApiService;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Example controller demonstrating BFF (Backend for Frontend) pattern.
 * Aggregates data from multiple external APIs and returns via Inertia.
 */
class DashboardController
{
    public function __construct(
        private ExternalApiService $apiService
    ) {}

    /**
     * Display the dashboard by aggregating data from multiple external APIs.
     *
     * @return Response
     */
    public function index(): Response
    {
        // Aggregate data from multiple external APIs in parallel
        // Note: Using /users and /posts from JSONPlaceholder as stats endpoint doesn't exist
        $data = $this->apiService->parallel([
            'users' => '/users?_limit=10',
            'posts' => '/posts?_limit=5',
        ]);

        // Generate statistics from fetched data
        $statistics = [
            'total_users' => count($data['users'] ?? []),
            'total_posts' => count($data['posts'] ?? []),
            'active_users' => rand(5, 10), // Mock data
            'growth_rate' => rand(10, 25), // Mock data
        ];

        return Inertia::render('Dashboard', [
            'users' => $data['users'] ?? [],
            'posts' => $data['posts'] ?? [],
            'statistics' => $statistics,
        ]);
    }
}
