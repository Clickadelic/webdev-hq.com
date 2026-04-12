#!/bin/sh
set -e

echo "==> Installing Composer dependencies..."
composer install --no-interaction --prefer-dist

echo "==> Ensuring .env exists..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "==> Generating application key..."
    php artisan key:generate
fi

echo "==> Running migrations..."
php artisan migrate --force

echo "==> Clearing & caching config..."
php artisan config:clear

echo "==> Setting permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "==> Starting Supervisor (Nginx + PHP-FPM)..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
