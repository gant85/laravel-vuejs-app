# Showcase Application

> **Full-stack Laravel BFF with Vue.js SPA** - Material Design 3 UI aggregating external REST APIs

[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=reference-app-laravel-vue&metric=alert_status)](https://sonarcloud.io/dashboard?id=reference-app-laravel-vue)
[![Build Status](https://dev.azure.com/your-org/reference-app-laravel-vue/_apis/build/status/main)](https://dev.azure.com/your-org/reference-app-laravel-vue/_build)

## 🎯 What is This?

**Showcase** is a **monolithic Laravel 12 application** implementing the **Backend for Frontend (BFF)** pattern:

- ✅ **Laravel as BFF**: Aggregates data from external REST APIs (not primary data owner)
- ✅ **Vue 3.5 SPA**: TypeScript + Vuetify 3.7 (Material Design 3) UI
- ✅ **Inertia.js**: SPA-like experience without building a REST API
- ✅ **Azure Entra ID**: Single Sign-On with Microsoft OAuth2/OIDC authentication
- ✅ **Minimal Database**: PostgreSQL only for sessions, cache, user preferences
- ✅ **External APIs**: Primary data source (JSONPlaceholder for demo)
- ✅ **OpenTelemetry**: Distributed tracing with Jaeger (frontend + backend)
- ✅ **SonarCloud**: Continuous code quality & security analysis
- ✅ **Sheriff**: Architecture enforcement for monorepo module boundaries

**Why BFF?**

- 🚀 Single HTTP request to Laravel (not multiple API calls from browser)
- 🔒 API credentials secured server-side (never exposed to client)
- 🧩 Server-side data aggregation & transformation
- ⚡ No CORS configuration needed (same-origin)

---

## 🏗️ Architecture

### Monorepo Structure

```
reference-app-laravel-vue/                    # Root monorepo
├── apps/
│   ├── showcase/            # Main Laravel BFF application
│   │   ├── app/             # PHP backend (Controllers, Services, Models)
│   │   ├── resources/js/    # Vue 3 frontend (TypeScript + Vuetify)
│   │   ├── routes/          # Laravel routes (Inertia)
│   │   └── database/        # Migrations (minimal schema)
│   │
│   └── showcase-ui-kit/     # UI component documentation
│       └── src/             # Component showcase & examples
│
├── libs/
│   └── ui-kit/              # Shared Vue components
│
├── docker/                  # Docker configurations (PHP, Nginx, PostgreSQL)
├── docs/                    # Documentation (ARCHITECTURE.md, DEVELOPMENT.md)
├── azure-pipelines.yml      # CI/CD pipeline configuration
└── docker-compose.yml       # Local development services
```

### Technology Stack

**Frontend**

- Vue.js 3.5 + TypeScript 5.x
- Vuetify 3.7 (Material Design 3)
- Vite 6.0 (HMR dev server)
- Inertia.js 2.1 (SPA bridge)

**Backend**

- Laravel 12 + PHP 8.2
- Inertia.js server adapter
- Guzzle HTTP client

**Infrastructure**

- PostgreSQL 16 (sessions, cache, preferences)
- Redis 7 (API response caching)
- Nginx (web server)
- Docker (local development)

**Observability**

- OpenTelemetry SDK (frontend + backend)
- Jaeger (trace visualization)

**Quality & CI/CD**

- SonarCloud (code quality & security)
- Sheriff (architecture enforcement)
- Azure DevOps (CI/CD pipelines)
- Azure (production hosting)

📖 **[Complete Architecture Documentation](docs/ARCHITECTURE.md)**

---

## 🚀 Quick Start

### Prerequisites

| Tool               | Version | Installation                                                                   |
| ------------------ | ------- | ------------------------------------------------------------------------------ |
| **Node.js**        | 24.12.0 | [NVS](https://github.com/jasongin/nvs) or [nvm](https://github.com/nvm-sh/nvm) |
| **pnpm**           | 10.6+   | `npm install -g pnpm@10.6`                                                     |
| **Docker Desktop** | Latest  | [docker.com](https://www.docker.com/products/docker-desktop)                   |

> **Note**: PHP 8.2 and Composer run inside Docker - no local installation needed

### Setup (5 minutes)

You can use the provided automated setup scripts to install dependencies, configure the environment, and start the Docker services.

**Windows (PowerShell)**

```powershell
# 1. Clone repository
git clone <repository-url> reference-app-laravel-vue
cd reference-app-laravel-vue

# 2. Run setup script
.\scripts\setup.ps1

# 3. Start development server (Vite with HMR)
pnpm dev
```

**macOS / Linux (Bash)**

```bash
# 1. Clone repository
git clone <repository-url> reference-app-laravel-vue
cd reference-app-laravel-vue

# 2. Make script executable and run
chmod +x scripts/setup.sh
./scripts/setup.sh

# 3. Start development server (Vite with HMR)
pnpm dev
```

<details>
<summary><b>Manual Setup</b></summary>

```bash
# 1. Clone repository
git clone <repository-url> reference-app-laravel-vue
cd reference-app-laravel-vue

# 2. Install Node dependencies (all workspaces)
pnpm install

# 3. Configure environment
cp apps/showcase/.env.example apps/showcase/.env
# Edit .env if needed (default uses JSONPlaceholder demo API)

# 4. Start Docker services
pnpm docker:up

# 5. Setup Laravel application
docker exec reference-app-laravel-vue-php composer install
docker exec reference-app-laravel-vue-php php artisan key:generate
docker exec reference-app-laravel-vue-postgres psql -U postgres -c "CREATE DATABASE showcase;"
docker exec reference-app-laravel-vue-php php artisan migrate

# 6. Start development server (Vite with HMR)
pnpm dev
```

</details>

### Access Application

- **Application**: http://localhost:8000
- **Vite HMR**: http://localhost:5173 (automatic - no need to access directly)
- **Jaeger Tracing**: http://localhost:16686
- **PostgreSQL**: localhost:5432 (user: postgres, password: postgres)
- **Redis**: localhost:6379

🎉 **You're ready!** Open http://localhost:8000 and start developing.

---

## 📖 Documentation

### Core Guides

| Document                                            | Description                                                           |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| **[ARCHITECTURE.md](docs/ARCHITECTURE.md)**         | Complete system architecture, BFF pattern, technology stack, diagrams |
| **[DEVELOPMENT.md](docs/DEVELOPMENT.md)**           | Setup guide, daily workflow, testing, debugging, troubleshooting      |
| **[AZURE-ENTRA-AUTH.md](docs/AZURE-ENTRA-AUTH.md)** | Azure Entra ID authentication setup and configuration                 |

### Quick References

| Topic | Link |
| ----- | ---- |

| **Git Workflow** | [docs/DEVELOPMENT.md#git-workflow-git-flow](docs/DEVELOPMENT.md#git-workflow-git-flow) |
| **Azure Entra Auth** | [docs/AZURE-ENTRA-AUTH.md](docs/AZURE-ENTRA-AUTH.md) |

### Architecture Diagrams

All diagrams use **PlantUML with technology icons**:

- [architecture.puml](docs/diagrams/architecture.puml) - Complete technology stack
- [system-context.puml](docs/diagrams/system-context.puml) - System boundaries
- [bff-flow.puml](docs/diagrams/bff-flow.puml) - BFF request flow
- [local-development.puml](docs/diagrams/local-development.puml) - Docker environment
- [azure-infrastructure.puml](docs/diagrams/azure-infrastructure.puml) - Azure production
- [cicd-pipeline.puml](docs/diagrams/cicd-pipeline.puml) - CI/CD workflow
- [opentelemetry-flow.puml](docs/diagrams/opentelemetry-flow.puml) - Distributed tracing

---

## 💻 Development

### Common Commands

```bash
# Development server (Vite HMR)
pnpm dev

# Build for production
pnpm build

# Run tests (Vitest + Pest)
pnpm test
pnpm test:coverage

# Lint & format
pnpm lint
pnpm format

# Type checking
pnpm type-check

# Architecture validation
pnpm sheriff

# Docker management
pnpm docker:up      # Start containers
pnpm docker:down    # Stop containers
pnpm docker:logs    # View logs
```

### Laravel Commands (via Docker)

```bash
# Artisan commands
docker exec reference-app-laravel-vue-php php artisan <command>

# Common commands
docker exec reference-app-laravel-vue-php php artisan route:list
docker exec reference-app-laravel-vue-php php artisan migrate
docker exec reference-app-laravel-vue-php php artisan tinker

# PHP formatting & analysis
docker exec reference-app-laravel-vue-php vendor/bin/pint
docker exec reference-app-laravel-vue-php vendor/bin/phpstan analyse

# Tests
docker exec reference-app-laravel-vue-php php artisan test
```

### Git Workflow

**Branch naming**:

- `feature/*` - New features (from `develop`)
- `fix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes (from `main`)
- `release/*` - Release preparation

**Commit convention** (enforced via commitlint):

```bash
feat(showcase): add user search functionality
fix(ui-kit): correct button spacing in NotificationCard
docs(architecture): update BFF pattern diagram
chore(deps): update Vue to 3.5.13
```

**Allowed scopes**: `showcase`, `showcase-ui-kit`, `ui-kit`, `docker`, `ci`, `deps`, `docs`, `config`

**Pre-commit hooks** (Lefthook - automatic):

- ✅ Prettier formatting
- ✅ ESLint + Stylelint fixes
- ✅ Laravel Pint (PHP)

**Full Git Flow workflow**: See [DEVELOPMENT.md - Git Workflow](docs/DEVELOPMENT.md#git-workflow-git-flow)

---

## 🧪 Testing

### Frontend Tests (Vitest)

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### Backend Tests (Pest)

```bash
# Run all tests
docker exec reference-app-laravel-vue-php php artisan test

# Run specific test
docker exec reference-app-laravel-vue-php php artisan test --filter UserTest

# With coverage
docker exec reference-app-laravel-vue-php php artisan test --coverage
```

### Architecture Tests (Sheriff)

```bash
# Validate dependency rules
pnpm sheriff

# Rules enforced:
# - libs/ui-kit
# - Apps can depend on all libs
# - Libs CANNOT depend on apps
```

---

## 📊 Quality & CI/CD

### Code Quality (SonarCloud)

**Automatic analysis** on every push:

- Code smells & technical debt
- Security vulnerabilities
- Code coverage
- Duplications

**View reports**: [SonarCloud Dashboard](https://sonarcloud.io/dashboard?id=reference-app-laravel-vue)

### CI/CD Pipeline (Azure DevOps)

**Stages**:

1. **Build** (parallel):
   - Frontend quality (ESLint, TypeScript, Sheriff, Prettier)
   - Frontend tests (Vitest + coverage)
   - Backend quality (Pint, PHPStan)
   - Backend tests (Pest + coverage)
   - SonarCloud analysis
   - Build application (Vite + Composer)

2. **Deploy Dev** (`develop` branch):
   - Deploy to Azure App Service (dev)
   - Run migrations

3. **Deploy Production** (`main` branch):
   - Deploy to Azure App Service (production)
   - Run migrations
   - Optimize cache
   - Update Confluence docs

**View pipeline**: [Azure DevOps](https://dev.azure.com/your-org/reference-app-laravel-vue)

---

## 🚀 Deployment

### Production (Azure)

**Infrastructure**:

- Azure App Service (PHP 8.2 Linux)
- Azure Database for PostgreSQL (Flexible Server)
- Azure Cache for Redis (Premium)
- Azure Application Insights (OpenTelemetry)
- Azure Front Door (CDN + WAF)

**Automatic deployment**:

- `main` branch → Production
- `develop` branch → Development

**Manual deployment**:

```bash
# Via Azure CLI
az webapp deployment source config-zip \
  --resource-group <rg> \
  --name <app-name> \
  --src showcase-app.zip
```

See [Azure Infrastructure Diagram](docs/diagrams/azure-infrastructure.puml)

---

## 🔍 Observability

### Distributed Tracing (Jaeger)

**Local development**:

- Access: http://localhost:16686
- Services: `showcase-frontend`, `showcase-backend`

**Production**:

- Azure Application Insights (OTLP ingestion)
- View traces in Azure Portal

**What's traced**:

- Frontend: User interactions, Inertia navigation, HTTP requests
- Backend: Route handling, external API calls, database queries, cache operations

See [OpenTelemetry Flow Diagram](docs/diagrams/opentelemetry-flow.puml)

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'feat(showcase): add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request to `develop`

**PR checklist**:

- ✅ All tests pass
- ✅ Lint checks pass
- ✅ TypeScript type check passes
- ✅ SonarCloud quality gate passes
- ✅ Documentation updated
- ✅ Conventional commit format

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/reference-app-laravel-vue/issues)
- **Documentation**: [docs/](docs/) folder
- **Confluence**: [AHI Service Wiki](https://ahi-service.atlassian.net/wiki)
- **Azure DevOps**: [CI/CD Pipeline](https://dev.azure.com/your-org/reference-app-laravel-vue)

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🙏 Acknowledgments

- **Laravel** - The PHP framework for web artisans
- **Vue.js** - The progressive JavaScript framework
- **Inertia.js** - Create modern monolithic applications
- **Vuetify** - Material Design component framework
- **OpenTelemetry** - Observability standard
- **SonarCloud** - Continuous code quality
