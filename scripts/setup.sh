#!/usr/bin/env bash

set -e

echo "======================================"
echo "   reference-app-laravel-vue - Setup Script"
echo "======================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check and configure NVS (Node Version Switcher)
if command -v nvs &> /dev/null; then
    nvs auto
    echo "NVS: Configured Node.js version from .node-version"
else
    echo "NVS: Not installed (will use system Node.js)"
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js version 18 or later"
    exit 1
fi
echo "Node.js $(node -v)"

# Check PHP (optional - runs in Docker)
if ! command -v php &> /dev/null; then
    echo "PHP: Not installed locally (will use Docker)"
else
    echo "PHP: $(php -v | head -n 1)"
fi

# Check Composer (optional - runs in Docker)
if ! command -v composer &> /dev/null; then
    echo "Composer: Not installed locally (will use Docker)"
else
    echo "Composer: $(composer -V)"
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi
echo "pnpm: $(pnpm -v)"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker Desktop"
    exit 1
fi
echo "$(docker -v)"

echo ""
echo "Installing dependencies..."

# Install Node dependencies
echo "Installing Node.js dependencies..."
pnpm install

# Install PHP dependencies (inside Docker)
echo "Installing PHP dependencies..."
echo "# Will be installed via Docker after containers are up"

echo ""
echo "Setting up environment..."

# Setup .env
if [ ! -f apps/showcase/.env ]; then
    cp apps/showcase/.env.example apps/showcase/.env
    echo "Created .env file"
else
    echo ".env file already exists"
fi

echo ""
echo "Starting Docker containers..."

# Fix line endings in entrypoint.sh (ensure LF on all platforms)
if [ -f docker/php/entrypoint.sh ]; then
    dos2unix docker/php/entrypoint.sh 2>/dev/null || sed -i 's/\r$//' docker/php/entrypoint.sh 2>/dev/null || true
    echo "Fixed line endings in entrypoint.sh"
fi

# Start Docker with local config
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build

# Wait for PostgreSQL
echo "Waiting for PostgreSQL to be ready..."
sleep 15

echo ""
echo "Installing PHP dependencies in container..."
docker exec reference-app-laravel-vue-php composer install --no-interaction

echo "Ensuring Laravel writable directory permissions..."
docker exec reference-app-laravel-vue-php sh -lc "mkdir -p storage/logs bootstrap/cache && touch storage/logs/laravel.log && chown -R www-data:www-data storage bootstrap/cache && chmod -R ug+rwX storage bootstrap/cache && chmod 664 storage/logs/laravel.log"

echo ""
echo "Generating application key..."
docker exec --user www-data reference-app-laravel-vue-php php artisan key:generate

echo ""
echo "Setting up database..."

# Create database if not exists
docker exec reference-app-laravel-vue-postgres psql -U postgres -c "CREATE DATABASE showcase;"

# Run migrations
docker exec --user www-data reference-app-laravel-vue-php php artisan migrate --force

echo "Re-applying writable directory permissions..."
docker exec reference-app-laravel-vue-php sh -lc "mkdir -p storage/logs bootstrap/cache && touch storage/logs/laravel.log && chown -R www-data:www-data storage bootstrap/cache && chmod -R ug+rwX storage bootstrap/cache && chmod 664 storage/logs/laravel.log"

echo ""
echo "======================================"
echo "   Setup completed successfully!"
echo "======================================"
echo ""
echo "Application is running at:"
echo "   http://localhost:8000"
echo ""
echo "Next steps:"
echo "   1. Read docs/local-development/01-setup.md for detailed documentation"
echo "   2. Read docs/architecture/02-git-flow.md for Git workflow"
echo "   3. Start coding!"
echo ""
