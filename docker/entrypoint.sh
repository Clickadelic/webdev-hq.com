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

echo "==> Waiting for database to accept connections..."
tries=0
max_tries=30
until php -r '
    $h = getenv("DB_HOST") ?: "127.0.0.1";
    $p = getenv("DB_PORT") ?: "3306";
    $u = getenv("DB_USERNAME") ?: "root";
    $pw = getenv("DB_PASSWORD") ?: "";
    $d = getenv("DB_DATABASE") ?: "";
    new PDO("mysql:host={$h};port={$p};dbname={$d}", $u, $pw);
' >/dev/null 2>&1; do
    tries=$((tries + 1))
    if [ "$tries" -ge "$max_tries" ]; then
        echo "==> ERROR: database was not reachable after ${max_tries} attempts." >&2
        exit 1
    fi
    echo "    ...database not ready yet, retrying in 2s (${tries}/${max_tries})"
    sleep 2
done
echo "==> Database is ready."

echo "==> Running migrations..."
if ! php artisan migrate --force; then
    echo "==> ERROR: Migrations failed. If this is caused by a stale/mismatched database volume," >&2
    echo "           reset it with: docker compose down -v && docker compose up -d --build" >&2
    exit 1
fi

echo "==> Clearing & caching config..."
php artisan config:clear

echo "==> Setting permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "==> Starting Supervisor (Nginx + PHP-FPM)..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
