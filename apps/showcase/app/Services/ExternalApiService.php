<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Service class for interacting with external REST APIs.
 * Implements BFF pattern: aggregates, transforms, and caches external API data.
 */
class ExternalApiService
{
  private string $baseUrl;
  private ?string $token;
  private int $timeout;
  private int $retryTimes;

  public function __construct()
  {
    $this->baseUrl = config('services.external_api.base_url');
    $this->token = config('services.external_api.token');
    $this->timeout = config('services.external_api.timeout', 10);
    $this->retryTimes = config('services.external_api.retry_times', 3);
  }

  /**
   * Fetch users from external API with caching and error handling.
   *
   * @param int $page Page number
   * @param int $perPage Items per page
   * @return array
   */
  public function getUsers(int $page = 1, int $perPage = 20): array
  {
    $cacheKey = "external_api.users.page.{$page}.{$perPage}";

    return Cache::remember($cacheKey, 300, function () use ($page, $perPage) {
      try {
        $response = $this->makeRequest('GET', '/users', [
          'page' => $page,
          'per_page' => $perPage,
        ]);

        return $this->transformUsers($response['data'] ?? []);
      } catch (\Exception $e) {
        Log::error('Failed to fetch users from external API', [
          'error' => $e->getMessage(),
          'page' => $page,
          'per_page' => $perPage,
        ]);

        // Return empty array on failure (graceful degradation)
        return [];
      }
    });
  }

  /**
   * Fetch statistics from external API.
   *
   * @return array
   */
  public function getStatistics(): array
  {
    $cacheKey = 'external_api.statistics';

    return Cache::remember($cacheKey, 60, function () {
      try {
        $response = $this->makeRequest('GET', '/stats');

        return [
          'total_users' => $response['total_users'] ?? 0,
          'active_users' => $response['active_users'] ?? 0,
          'total_posts' => $response['total_posts'] ?? 0,
          'growth_rate' => $response['growth_percentage'] ?? 0,
        ];
      } catch (\Exception $e) {
        Log::error('Failed to fetch statistics from external API', [
          'error' => $e->getMessage(),
        ]);

        // Return default values on failure
        return [
          'total_users' => 0,
          'active_users' => 0,
          'total_posts' => 0,
          'growth_rate' => 0,
        ];
      }
    });
  }

  /**
   * Fetch user by ID from external API.
   *
   * @param int $userId
   * @return array|null
   */
  public function getUserById(int $userId): ?array
  {
    $cacheKey = "external_api.user.{$userId}";

    return Cache::remember($cacheKey, 300, function () use ($userId) {
      try {
        $response = $this->makeRequest('GET', "/users/{$userId}");

        return $this->transformUser($response['data'] ?? []);
      } catch (\Exception $e) {
        Log::error('Failed to fetch user from external API', [
          'error' => $e->getMessage(),
          'user_id' => $userId,
        ]);

        return null;
      }
    });
  }

  /**
   * Create a new resource via external API.
   *
   * @param string $endpoint
   * @param array $data
   * @return array
   * @throws \Exception
   */
  public function create(string $endpoint, array $data): array
  {
    $response = $this->makeRequest('POST', $endpoint, $data);

    // Invalidate related caches
    $this->invalidateCache($endpoint);

    return $response;
  }

  /**
   * Update a resource via external API.
   *
   * @param string $endpoint
   * @param array $data
   * @return array
   * @throws \Exception
   */
  public function update(string $endpoint, array $data): array
  {
    $response = $this->makeRequest('PUT', $endpoint, $data);

    // Invalidate related caches
    $this->invalidateCache($endpoint);

    return $response;
  }

  /**
   * Make HTTP request to external API with retry logic.
   *
   * @param string $method HTTP method
   * @param string $endpoint API endpoint
   * @param array $data Request data
   * @return array Response data
   * @throws \Exception
   */
  private function makeRequest(string $method, string $endpoint, array $data = []): array
  {
    $request = Http::baseUrl($this->baseUrl)
      ->timeout($this->timeout)
      ->retry($this->retryTimes, 100);

    // Add authentication token if configured
    if ($this->token) {
      $request->withToken($this->token);
    }

    // Make request based on method
    $response = match (strtoupper($method)) {
      'GET' => $request->get($endpoint, $data),
      'POST' => $request->post($endpoint, $data),
      'PUT' => $request->put($endpoint, $data),
      'DELETE' => $request->delete($endpoint, $data),
      default => throw new \InvalidArgumentException("Unsupported HTTP method: {$method}"),
    };

    if ($response->failed()) {
      throw new \Exception(
        "API request failed: {$response->status()} - {$response->body()}"
      );
    }

    return $response->json();
  }

  /**
   * Transform external API user data to frontend-friendly format.
   *
   * @param array $users
   * @return array
   */
  private function transformUsers(array $users): array
  {
    return array_map(fn($user) => $this->transformUser($user), $users);
  }

  /**
   * Transform single user data.
   *
   * @param array $user
   * @return array
   */
  private function transformUser(array $user): array
  {
    return [
      'id' => $user['id'] ?? null,
      'name' => isset($user['first_name'], $user['last_name'])
        ? "{$user['first_name']} {$user['last_name']}"
        : ($user['name'] ?? 'Unknown'),
      'email' => $user['email'] ?? null,
      'avatar' => $user['profile_image_url'] ?? $user['avatar'] ?? null,
      'status' => ($user['is_active'] ?? true) ? 'active' : 'inactive',
      'created_at' => $user['created_at'] ?? null,
    ];
  }

  /**
   * Invalidate caches related to an endpoint.
   *
   * @param string $endpoint
   * @return void
   */
  private function invalidateCache(string $endpoint): void
  {
    // Extract resource type from endpoint (e.g., /users/123 -> users)
    $resource = explode('/', trim($endpoint, '/'))[0];

    // Flush all caches for this resource
    Cache::tags(['external_api', $resource])->flush();
  }

  /**
   * Make parallel requests to multiple endpoints.
   *
   * @param array $endpoints Array of endpoint URLs
   * @return array Responses indexed by endpoint
   */
  public function parallel(array $endpoints): array
  {
    $responses = Http::pool(function ($pool) use ($endpoints) {
      $requests = [];

      foreach ($endpoints as $key => $endpoint) {
        $request = $pool->baseUrl($this->baseUrl)
          ->timeout($this->timeout);

        if ($this->token) {
          $request->withToken($this->token);
        }

        $requests[$key] = $request->get($endpoint);
      }

      return $requests;
    });

    $results = [];
    $endpointsArray = array_values($endpoints); // Reindex to ensure numeric keys

    foreach ($responses as $key => $response) {
      if ($response->successful()) {
        $results[$key] = $response->json();
      } else {
        $endpointUrl = $endpointsArray[$key] ?? 'unknown';
        Log::warning("Parallel request failed for endpoint: {$endpointUrl}", [
          'status' => $response->status(),
        ]);
        $results[$key] = null;
      }
    }

    return $results;
  }
}
