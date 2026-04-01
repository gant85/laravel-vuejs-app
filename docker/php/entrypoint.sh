#!/usr/bin/env bash
set -e

# Ensure VS Code server directory has correct permissions
mkdir -p /var/www/.vscode-server
chown -R www-data:www-data /var/www/.vscode-server 2>/dev/null || true

# If command is passed (e.g., from dev container), execute it
if [ $# -gt 0 ]; then
    exec "$@"
fi

echo "Initializing Laravel application..."

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until php -r "new PDO('pgsql:host=postgres;port=5432;dbname=showcase', 'postgres', 'postgres');" 2>/dev/null; do
    echo "Waiting for PostgreSQL connection..."
    sleep 2
done

echo "PostgreSQL is ready!"

# Marker file to track if initial setup is done
INIT_MARKER="/var/www/.docker-initialized"
NEEDS_INIT=false

# Install Composer dependencies only if vendor/autoload.php doesn't exist or composer.lock changed
if [ ! -f "vendor/autoload.php" ]; then
    echo "Installing Composer dependencies..."
    echo "Running composer update to sync lock file with composer.json..."
    composer update --no-interaction --prefer-dist --optimize-autoloader --no-scripts
    NEEDS_INIT=true
elif [ "vendor/autoload.php" -ot "composer.lock" ]; then
    echo "Updating Composer dependencies (composer.lock changed)..."
    echo "Running composer update to sync lock file with composer.json..."
    composer update --no-interaction --prefer-dist --optimize-autoloader --no-scripts
    NEEDS_INIT=true
else
    echo "Composer dependencies already up to date"
fi

# Run migrations only if needed (first run or dependencies changed)
if [ ! -f "$INIT_MARKER" ] || [ "$NEEDS_INIT" = true ]; then
    echo "Running migrations..."
    php artisan migrate --force

    echo "Clearing caches..."
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear

    # Create marker file
    touch "$INIT_MARKER"
    echo "Initial setup completed!"
else
    echo "Application already initialized, skipping migrations and cache clearing"
fi

# Cache config for production
if [ "$APP_ENV" = "production" ]; then
    echo "Caching configuration for production..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

echo "Laravel application ready!"

# Start PHP-FPM
exec php-fpm
