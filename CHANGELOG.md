# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **showcase**: Azure Entra ID authentication with Laravel Socialite (OAuth2/OIDC)
  - Single Sign-On with Microsoft work/school accounts
  - Automatic user provisioning on first login
  - Profile synchronization (name, email, avatar)
  - OpenTelemetry tracing for auth operations
  - Login page with Material Design 3
  - User menu with logout functionality
  - See [docs/AZURE-ENTRA-AUTH.md](docs/AZURE-ENTRA-AUTH.md) for setup

### Changed

- **showcase**: Simplified dashboard to showcase UI-kit components only
  - Removed complex events calendar, activities timeline, and date picker
  - Focused on demonstrating Button, Panel, NotificationCard, ProgressIndicatorLinear, MessageBar components
  - Reduced from 586 to 280 lines (52% reduction)

### Removed

- **showcase**: Cleaned up redundant code and unused files
  - Removed 336 lines of duplicate dashboard code
  - Removed unused controller methods (users(), show(), buildSummary())
  - Removed unused routes (/users, /users/{id})
  - Removed BFF-IMPLEMENTATION.md (info in docs/ARCHITECTURE.md)
  - Removed example BFF/Users.vue component
  - Removed unused imports (ProgressIndicatorCircular, DatePicker, Button)
  - Total reduction: 411 lines (41% of affected files)

### Fixed

- **showcase-ui-kit**: Fixed TypeScript errors in NotificationsXsDemo.vue (changed `NotificationCardType.Information` to `NotificationCardType.Info`)

### Changed

- **docs**: Updated all documentation to reflect current versions (Laravel 12, Vue 3.5, Vuetify 3.7, Vite 6.0, pnpm 10.6, Node 24.12.0)
- **docs**: Updated commit scopes in commitlint config and documentation (`hospital`, `showcase`, `showcase-ui-kit`, `ui-kit`, `docker`, `ci`, `deps`, `docs`, `config`)
- **docs**: Enhanced README.md with detailed command descriptions and correct version numbers
- **docs**: Updated SETUP.md with current prerequisite versions
- **docs**: Updated GIT_FLOW.md with correct commit scopes and types
- **docs**: Updated architecture.md with current technology stack versions
- **Major Upgrade**: Laravel 11.39 → 12.47.0
- Updated Node.js from v24.7.0 to v24.12.0 (Latest LTS)
- Updated pnpm from 8.15.0 to 10.6.0
- Updated Inertia.js Laravel adapter from 1.0 to 2.0.18 (Breaking changes - see migration guide)
- Updated Pest from 2.0 to 3.8.4
- Updated PHPStan from 1.10 to 2.1.33
- Updated Larastan from 2.0 to 3.8.1
- Updated Nunomaduro Collision from 8.0 to 8.8.3
- Updated FakerPHP from 1.23 to 1.24
- Updated Laravel Tinker from 2.9 to 2.11
- Updated Laravel Pint from 1.13 to 1.27
- Updated Laravel Sail from 1.26 to 1.52
- Updated PHPUnit from 10.x to 11.5.33
- Updated Vue from 3.5.26 to 3.5.13
- Updated Vuetify from 3.11.6 to 3.7.6
- Updated Vite from 5.4.21 to 6.0.7
- Updated TypeScript from 5.3.3/5.9.3 to 5.7.3
- Updated Vitest from 1.x to 2.1.8
- Updated vue-router from 4.2.5 to 4.5.0
- Updated axios from 1.6.7 to 1.7.9
- Updated laravel-vite-plugin from 1.0.2 to 1.1.1
- Updated @types/node from 20.11.5 to 22.10.5
- Updated happy-dom from 14.12.0 to 16.11.8
- Updated vue-tsc to 2.2.0
- Updated lefthook from 2.0.15 to 2.1.5
- Updated stylelint-config-standard from 39.0.0 to 39.0.1

### Breaking Changes

- **Laravel 12**: Review [Laravel 12 upgrade guide](https://laravel.com/docs/12.x/upgrade)
- **Inertia.js 2.0**: Breaking changes in API - check middleware and shared data
- **Pest 3.0**: New assertion API and test structure
- **PHPStan 2.0**: Stricter type checking
- **Vite 6.0**: Updated build configuration
- **Vitest 2.0**: New testing APIs

### Added

- Monorepo structure with pnpm workspaces
- Laravel backend with Inertia.js
- Vue 3 frontend with TypeScript
- Material 3 UI with Vuetify 3
- Docker Compose for local development
- Azure DevOps CI/CD pipeline
- Git Flow workflow documentation
- Code quality tools (ESLint, Pint, PHPStan)

## [1.0.0] - 2026-01-13

### Added

- Initial POC release
- Full-stack setup with Laravel + Vue + Inertia
- Material 3 design system
- Monorepo structure
- Docker environment
- Azure deployment configuration
