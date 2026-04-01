# Dev Container Configuration

This directory contains the configuration for VS Code Dev Containers, enabling a consistent development environment across the team.

## What is a Dev Container?

Dev Containers allow you to use a Docker container as a full-featured development environment. VS Code runs inside the container and provides:

- Consistent tooling and dependencies
- Pre-configured extensions
- Isolated environment per project
- Portable across different machines

## Prerequisites

1. **Docker Desktop** - Install from [docker.com](https://www.docker.com/products/docker-desktop)
2. **VS Code** - Install from [code.visualstudio.com](https://code.visualstudio.com/)
3. **Dev Containers Extension** - Install from VS Code marketplace: `ms-vscode-remote.remote-containers`

## Getting Started

### Option 1: Open in Container (Recommended)

1. Open the `reference-app-laravel-vue` folder in VS Code
2. Click the green button in the bottom-left corner
3. Select "Reopen in Container"
4. Wait for the container to build and start (first time takes ~5-10 minutes)

### Option 2: Clone Repository in Container Volume

1. Press `F1` and select "Dev Containers: Clone Repository in Container Volume..."
2. Enter the repository URL
3. Select the branch
4. Wait for setup to complete

## What Gets Configured

### Services

The dev container uses the existing `docker-compose.yml` configuration:

- **PHP 8.2-FPM** - Laravel application (your workspace)
- **PostgreSQL 16** - Database server (port 5432)
- **Redis 7** - Cache server (port 6379)
- **Nginx** - Web server (port 8000)
- **Node.js 24.7.0** - Vite dev server (port 5173)

### VS Code Extensions

Automatically installed inside the container:

- **Vue Language Features (Volar)** - Vue 3 support
- **Intelephense** - PHP language server
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Stylelint** - CSS/SCSS linting
- **Sheriff** - Architecture rules enforcement
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **SonarLint** - Code quality analysis
- **Conventional Commits** - Commit message helper
- **Docker** - Docker file support
- **Code Spell Checker** - Spelling verification

### Post-Creation Setup

After the container starts, these commands run automatically:

1. `composer install` - Install PHP dependencies
2. `php artisan key:generate` - Generate application key
3. `php artisan migrate --force` - Run database migrations

## Development Workflow

### Running the Application

The application runs on **port 8000** via Nginx:

```bash
http://localhost:8000
```

Vite dev server (HMR) runs on **port 5173**:

```bash
http://localhost:5173
```

### Common Commands

Open the integrated terminal in VS Code (runs inside container):

```bash
# Install dependencies
composer install
pnpm install

# Run migrations
php artisan migrate

# Start Vite dev server (if not already running)
pnpm dev

# Run tests
php artisan test
pnpm test

# Lint code
pnpm lint

# Type check
pnpm type-check
```

### VS Code Tasks

Use VS Code tasks (Terminal > Run Task):

- **Dev: Hospital App** - Start Vite dev server
- **Build: All** - Build all apps
- **Lint: All** - Lint all code
- **Test: All** - Run all tests
- **Docker: Up/Down** - Control Docker services

### Database Access

Connect to PostgreSQL from inside the container:

```bash
psql -h postgres -U postgres -d hospital
```

Or from VS Code using the PostgreSQL extension with these credentials:

- Host: `localhost`
- Port: `5432`
- User: `postgres`
- Password: `postgres`
- Database: `hospital`

## Troubleshooting

### Container Won't Start

1. Ensure Docker Desktop is running
2. Check Docker has enough resources (4GB+ RAM, 2+ CPUs)
3. Remove old containers: `docker compose down -v`
4. Rebuild: "Dev Containers: Rebuild Container" in VS Code

### Port Conflicts

If ports 5432, 6379, or 8000 are already in use:

1. Stop conflicting services
2. Or modify `docker-compose.yml` to use different ports

### Permission Issues

The container runs as `www-data` user. If you encounter permission issues:

```bash
# Fix Laravel storage permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Extensions Not Loading

1. Ensure `ms-vscode-remote.remote-containers` extension is installed **locally** (not in container)
2. Rebuild container: "Dev Containers: Rebuild Container"

## Advanced Configuration

### SSH Key Mounting

The dev container automatically mounts your SSH keys from `~/.ssh` to enable Git operations. Ensure your SSH agent is running:

```bash
# Windows (PowerShell)
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent

# Linux/macOS
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

### Custom Environment Variables

1. Copy `.env.example` to `.env` in `apps/hospital/`
2. Modify as needed
3. Rebuild container to apply changes

### Adding PHP Extensions

Edit `docker/php/Dockerfile` and rebuild:

```dockerfile
RUN docker-php-ext-install your_extension
```

Then rebuild: "Dev Containers: Rebuild Container"

## Benefits

✅ **Consistent Environment** - Everyone uses the same PHP, Node.js, database versions  
✅ **No Local Setup** - No need to install PHP, Composer, MySQL on your machine  
✅ **Isolated** - Project dependencies don't conflict with other projects  
✅ **Fast Onboarding** - New team members up and running in minutes  
✅ **Cross-Platform** - Works identically on Windows, macOS, Linux

## Resources

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Dev Container Specification](https://containers.dev/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
