#!/usr/bin/env pwsh

$ErrorActionPreference = "Stop"

Write-Host "======================================"
Write-Host "   reference-app-laravel-vue - Setup Script"
Write-Host "======================================"
Write-Host ""

# Check prerequisites
Write-Host " Checking prerequisites..."

# Check and configure NVS (Node Version Switcher)
try {
  nvs auto
  Write-Host " NVS: Configured Node.js version from .node-version"
}
catch {
  Write-Host " NVS: Not installed or failed (will use system Node.js)" -ForegroundColor Yellow
}

# Check Node.js
try {
  $nodeVersion = node -v
  Write-Host " Node.js $nodeVersion"
}
catch {
  Write-Host "Node.js is not installed. Please install Node.js version 18 or later" -ForegroundColor Red
  exit 1
}

# Check PHP (optional - runs in Docker)
try {
  $phpVersion = php -v | Select-Object -First 1
  Write-Host "PHP: $phpVersion"
}
catch {
  Write-Host "PHP: Not installed locally (will use Docker)" -ForegroundColor Yellow
}

# Check Composer (optional - runs in Docker)
try {
  $composerVersion = composer -V
  Write-Host "Composer: $composerVersion"
}
catch {
  Write-Host "Composer: Not installed locally (will use Docker)" -ForegroundColor Yellow
}

# Check pnpm
try {
  $pnpmVersion = pnpm -v
  Write-Host "pnpm: $pnpmVersion"
}
catch {
  Write-Host "pnpm is not installed. Installing pnpm..." -ForegroundColor Yellow
  npm install -g pnpm
  $pnpmVersion = pnpm -v
  Write-Host " pnpm $pnpmVersion"
}

# Check Docker
try {
  $dockerVersion = docker -v
  Write-Host " $dockerVersion"
}
catch {
  Write-Host " Docker is not installed. Please install Docker Desktop" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host " Installing dependencies..."

# Install Node dependencies
Write-Host "Installing Node.js dependencies..."
pnpm install

# Install PHP dependencies (inside Docker)
Write-Host "Installing PHP dependencies..."
Write-Host "# Will be installed via Docker after containers are up"

Write-Host ""
Write-Host "  Setting up environment..."

# Setup .env
if (-not (Test-Path "apps/showcase/.env")) {
  Copy-Item "apps/showcase/.env.example" "apps/showcase/.env"
  Write-Host " Created .env file"
}
else {
  Write-Host "  .env file already exists"
}

Write-Host ""
Write-Host " Starting Docker containers..."

# Fix line endings in entrypoint.sh (Windows compatibility)
$entrypointPath = "docker/php/entrypoint.sh"
if (Test-Path $entrypointPath) {
  $content = Get-Content $entrypointPath -Raw
  $content = $content -replace "`r`n", "`n"
  [System.IO.File]::WriteAllText("$PWD\$entrypointPath", $content, (New-Object System.Text.UTF8Encoding $false))
  Write-Host "Fixed line endings in entrypoint.sh"
}

# Start Docker with local config
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build

# Wait for PostgreSQL
Write-Host " Waiting for PostgreSQL to be ready..."
Start-Sleep -Seconds 15

Write-Host ""
Write-Host " Installing PHP dependencies in container..."
docker exec reference-app-laravel-vue-php composer install --no-interaction

Write-Host " Ensuring Laravel writable directory permissions..."
docker exec reference-app-laravel-vue-php sh -lc "mkdir -p storage/logs bootstrap/cache && touch storage/logs/laravel.log && chown -R www-data:www-data storage bootstrap/cache && chmod -R ug+rwX storage bootstrap/cache && chmod 664 storage/logs/laravel.log"

Write-Host ""
Write-Host " Migrating database..."
docker exec --user www-data reference-app-laravel-vue-php php artisan migrate --path=vendor/laravel/telescope/database/migrations

Write-Host ""
Write-Host " Generating application key..."
docker exec --user www-data reference-app-laravel-vue-php php artisan key:generate --force

Write-Host ""
Write-Host "  Setting up database..."

# Create database if not exists
docker exec reference-app-laravel-vue-postgres psql -U postgres -c 'CREATE DATABASE showcase;'

# Run migrations
docker exec --user www-data reference-app-laravel-vue-php php artisan migrate --force

Write-Host " Re-applying writable directory permissions..."
docker exec reference-app-laravel-vue-php sh -lc "mkdir -p storage/logs bootstrap/cache && touch storage/logs/laravel.log && chown -R www-data:www-data storage bootstrap/cache && chmod -R ug+rwX storage bootstrap/cache && chmod 664 storage/logs/laravel.log"

Write-Host ""
Write-Host "======================================"
Write-Host "    Setup completed successfully!"
Write-Host "======================================"
Write-Host ""
Write-Host " Application is running at:"
Write-Host "   http://localhost:8000"
Write-Host ""
Write-Host " Next steps:"
Write-Host "   1. Read docs/DEVELOPMENT.md for detailed documentation"
Write-Host "   2. Read docs/ARCHITECTURE.md for Architecture and Git flow"
Write-Host "   3. Start coding! "
Write-Host ""
