# Copilot Instructions

## Language Policy

**All documentation, comments, commit messages, and project-related content MUST be written in English.**

## Project Overview

Full-stack monorepo for **Showcase Application** using:

- **Architecture**: Monolithic Laravel app with BFF (Backend for Frontend) pattern
- **Backend**: Laravel 12 (PHP 8.2) with Inertia.js 2.1 - acts as BFF to aggregate data from REST APIs
- **Frontend**: Vue 3.5 + TypeScript + Vuetify 3.7 (Material Design 3)
- **Build**: pnpm 10.6 workspaces, Vite 6.0 with HMR
- **Infrastructure**: Docker (PostgreSQL 16, Redis 7, Nginx, PHP-FPM, Jaeger) for local dev, Azure for production
- **CI/CD**: Azure DevOps pipelines - single artifact deployment
- **Observability**: OpenTelemetry with Jaeger for distributed tracing (frontend + backend)
- **Quality**: SonarCloud for code quality, Sheriff for architecture enforcement
- **Node Version**: v24.12.0 (managed via `.node-version` - auto-detected by nvs/nvm/fnm)

**⚠️ CRITICAL**: This is NOT a traditional REST API app. Laravel controllers return `Inertia::render()`, not JSON responses. Frontend pages receive data as props, never make direct API calls.

## Architecture

### Monorepo Structure

```
apps/showcase/    # Main Laravel app with Inertia.js + Vue
  ├── app/           # PHP backend (controllers, middleware)
  ├── resources/js/  # Vue 3 frontend (TS + Vuetify)
  ├── routes/        # Laravel routes (web.php uses Inertia::render)
  └── database/      # Migrations & seeders
apps/showcase-ui-kit/  # UI component showcase and documentation
libs/
  └── ui-kit/        # Shared Vue components
docker/              # PHP, Nginx, PostgreSQL configs
```

**Workspace dependencies** (`workspace:*`):

- Shared components: `import { NotificationCard } from '@reference-app-laravel-vue/ui-kit'`
- Sheriff enforces: libs cannot import from apps, ui-kit

### Key Integration: Inertia.js

- **No REST API needed**: Controllers return `Inertia::render('PageName', ['data' => $data])`
- **SPA-like UX**: Vue pages in `resources/js/Pages/` receive props from Laravel
- **Routing**: Laravel routes (`web.php`) map to Vue components via Inertia
- **Shared data**: Middleware `HandleInertiaRequests.php` shares global state
- **Single deployment**: Frontend assets compiled by Vite into `public/build`, deployed with Laravel

### BFF (Backend for Frontend) Pattern

- **Laravel as BFF**: Acts as intermediary layer between Vue frontend and external REST APIs
- **Data Aggregation**: Controllers fetch data from multiple REST APIs and aggregate responses
- **API Composition**: Combines multiple API calls into single Inertia responses
- **Minimal Database**: PostgreSQL used primarily for caching, sessions, and temporary data storage
- **Business Logic**: Focused on data transformation, aggregation, and presentation logic
- **External APIs**: Primary data source is external REST APIs, not local database

### Docker Services

**Two deployment modes**:

1. **Local Docker** (`docker-compose.local.yml`): PostgreSQL + Redis in containers
2. **Azure Services** (`docker-compose.azure.yml`): Azure Database for PostgreSQL + Azure Cache for Redis

Default services:

- `app` (PHP 8.2 + Composer) on port 8000 (via Nginx)
- `postgres` (16) on port 5432 (local mode only)
- `redis` (7) on port 6379 (local mode only)
- `node` (18) for Vite dev server on port 5173
- `jaeger` (latest) on ports 16686 (UI), 4318 (OTLP HTTP), 4317 (OTLP gRPC)

Start with: `pnpm docker:up` (uses local mode) or `pnpm docker:azure:up` (requires `.env.azure`)

## Development Workflow

### Initial Setup

```bash
pnpm install                                # Install all workspace deps
cp apps/showcase/.env.example apps/showcase/.env
pnpm docker:up                              # Start containers
docker exec reference-app-laravel-vue-php composer install    # PHP deps
docker exec reference-app-laravel-vue-postgres psql -U postgres -c "CREATE DATABASE showcase;"
docker exec reference-app-laravel-vue-php php artisan migrate
pnpm dev                                    # Start Vite HMR
```

### Daily Development

```bash
pnpm dev           # Runs Vite in showcase app (localhost:5173 HMR)
pnpm docker:logs   # View all container logs
```

**Access app at**: http://localhost:8000 (Nginx → PHP, with Vite HMR assets)

### Commands by Scope

- **Root**: `pnpm build`, `pnpm lint`, `pnpm type-check` (run across all workspaces)
- **PHP**: Execute via Docker: `docker exec reference-app-laravel-vue-php php artisan <command>`
- **Monorepo**: Scripts run in all apps/libs via `pnpm -r <script>`

**⚠️ PHP Execution**: NEVER run PHP/Composer commands locally - they MUST run inside Docker container. Use:

```bash
docker exec reference-app-laravel-vue-php composer <command>
docker exec reference-app-laravel-vue-php php artisan <command>
docker exec reference-app-laravel-vue-php vendor/bin/pest
```

### Testing & Quality

```bash
pnpm lint                  # ESLint for TS/Vue, Pint for PHP
pnpm type-check            # Vue TSC checks
pnpm sheriff               # Verify architecture (Sheriff)
docker exec reference-app-laravel-vue-php vendor/bin/pest  # PHP tests (Pest framework)
pnpm test                  # Frontend tests (Vitest - all workspaces)
pnpm test:coverage         # Coverage reports
```

**Testing frameworks**:

- **Frontend**: Vitest + Vue Test Utils + happy-dom (headless browser)
- **Backend**: Pest (elegant PHP testing)
- **Code Quality**: SonarCloud for continuous quality & security analysis
- **Architecture**: Sheriff (enforces dependency rules in [sheriff.config.ts](../sheriff.config.ts))
- **Observability**: OpenTelemetry + Jaeger for distributed tracing (frontend + backend)

## Git Workflow

### Branch Strategy (Git Flow)

- `main` → production-ready code (protected)
- `develop` → integration branch (protected)
- `feature/*` → branch from develop (e.g., `feature/patient-records`)
- `release/*` → version prep (e.g., `release/1.2.0`)
- `hotfix/*` → urgent fixes from main

### Commit Convention (Conventional Commits)

**Enforced via commitlint + lefthook**. Format: `type(scope): description`

**Allowed scopes**: `showcase`, `showcase-ui-kit`, `ui-kit`, `docker`, `ci`, `deps`, `docs`, `config`

Examples:

```bash
feat(showcase): add patient search
fix(ui-kit): correct button spacing
docs(config): update env variables
```

**⚠️ Commit Enforcement**: Pre-commit hooks auto-run:

- Prettier (auto-fixes staged files)
- ESLint (auto-fixes staged files)
- Stylelint (auto-fixes staged files)
- Laravel Pint (PHP linting via Docker)
- Commitlint (validates commit message format)

If hooks fail, commits are blocked. Run `pnpm lint:fix` to auto-fix most issues before committing.

### Pre-commit Hooks (Lefthook)

- Auto-formats staged files with Prettier, ESLint, Stylelint
- PHP files linted via Laravel Pint inside Docker container
- Post-merge: auto-installs deps if `package.json` or `composer.json` changed

**Troubleshooting**: If Lefthook not working on Windows, run `scripts/fix-lefthook.ps1`

## Coding Conventions

### Vue + Inertia Patterns

```typescript
// Pages use Inertia layouts (resources/js/Layouts/AppLayout.vue)
// Props passed from Laravel controller are typed
defineProps<{
  data: ExternalApiResponse; // Data aggregated from external APIs
  message: string;
}>();
```

### Laravel Controllers (BFF Pattern)

```php
// Controllers act as BFF - aggregate data from external APIs
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

public function index()
{
    // Call external REST APIs
    $users = Http::get('https://api.example.com/users')->json();
    $stats = Http::get('https://api.example.com/stats')->json();

    // Aggregate and transform data
    $aggregatedData = [
        'users' => $users,
        'statistics' => $this->transformStats($stats),
    ];

    return Inertia::render('Dashboard', $aggregatedData);
}

// Cache API responses when needed
public function cachedData()
{
    return Cache::remember('api-data', 300, function () {
        return Http::get('https://api.example.com/data')->json();
    });
}
```

### Vuetify Theming

Custom healthcare-themed Material 3 colors defined in `resources/js/app.ts`:

- Primary: `#0D47A1` (medical blue)
- Secondary: `#00897B` (healthcare teal)

### Shared Code

- Shared UI components: `import { NotificationCard } from '@reference-app-laravel-vue/ui-kit'`

**Sheriff rules** ([sheriff.config.ts](../sheriff.config.ts)):

- `libs/ui-kit`: no dependencies on other libs
- Apps can import from all libs, but libs CANNOT import from apps
- Prevents circular dependencies across the monorepo

## Key Files

- [docker-compose.yml](../docker-compose.yml) - Service orchestration
- [lefthook.yml](../lefthook.yml) - Git hooks config
- [commitlint.config.mjs](../commitlint.config.mjs) - Commit rules
- [apps/showcase/vite.config.ts](../apps/showcase/vite.config.ts) - Laravel Vite plugin + Vuetify
- [azure-pipelines.yml](../azure-pipelines.yml) - CI/CD for Azure
- [docs/architecture/02-git-flow.md](../docs/architecture/02-git-flow.md) - Detailed branching strategy

## Critical Developer Patterns

### 1. Adding New Routes (Inertia Pattern)

NEVER create API routes. Follow this pattern:

```php
// routes/web.php
Route::get('/example', [ExampleController::class, 'index'])->name('example');

// app/Http/Controllers/ExampleController.php
public function index(): Response
{
    $data = $this->apiService->getSomeData();
    return Inertia::render('Example/Index', ['data' => $data]);
}

// resources/js/Pages/Example/Index.vue
<script setup lang="ts">
defineProps<{ data: ExternalApiResponse }>(); // Props from Laravel
</script>
```

### 2. Service Layer Pattern (BFF)

Use `ExternalApiService` for all external API calls:

```php
// app/Services/ExternalApiService.php provides:
$this->apiService->getUsers($page, $perPage);  // Auto-cached
$this->apiService->parallel([...]);             // Parallel requests
```

### 3. Workspace Imports (TypeScript)

```typescript
// Use workspace:* protocol in package.json
import { NotificationCard } from '@reference-app-laravel-vue/ui-kit';
```

### 4. Sheriff Architecture Rules

- `libs/ui-kit`: No dependencies on other libs
- Apps can import all libs, libs CANNOT import apps
- Run `pnpm sheriff` to verify before committing

### 5. Docker-Based Development

- Database: Connect to `localhost:5432` (postgres/postgres)
- Redis: `localhost:6379`
- App URL: `http://localhost:8000` (Nginx proxy to PHP-FPM)
- Vite HMR: Auto-injected at `:5173` (no manual access needed)
