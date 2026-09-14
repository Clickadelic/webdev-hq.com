#!/bin/sh
set -e

# The "build" image stage strips .env after producing production assets,
# so the Vite dev server needs its own bootstrap independent of the host .env.
echo "==> Ensuring .env exists for Vite dev server..."
if [ ! -f .env ]; then
    cp .env.example .env
fi

if ! grep -q '^APP_KEY=base64:' .env; then
    echo "==> Generating application key..."
    php artisan key:generate --no-interaction
fi

exec "$@"
