# ============================================================
# Stage 1: Install PHP + Composer + Node, build everything
# ============================================================
FROM node:20-alpine AS build

# Install PHP 84 CLI (needed for Composer + wayfinder:generate during Vite build)
RUN apk add --no-cache \
    php84 php84-phar php84-mbstring php84-openssl php84-tokenizer \
    php84-xml php84-dom php84-iconv php84-session php84-fileinfo \
    php84-ctype php84-curl php84-pdo php84-pdo_sqlite \
    && ln -sf /usr/bin/php84 /usr/bin/php \
    && echo 'memory_limit = 512M' > /etc/php84/conf.d/99_memory.ini

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Install PHP dependencies first (better layer caching)
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-scripts \
    --prefer-dist \
    --optimize-autoloader

# Install Node dependencies
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy full source and build frontend assets
COPY . .
RUN composer dump-autoload --no-scripts --optimize \
    && cp .env.example .env \
    && sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/' .env \
    && sed -i 's|DB_DATABASE=.*|DB_DATABASE=/app/database/database.sqlite|' .env \
    && sed -i 's/APP_ENV=local/APP_ENV=production/' .env \
    && sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env \
    && touch database/database.sqlite \
    && rm -f bootstrap/cache/packages.php bootstrap/cache/services.php \
    && php -d memory_limit=512M artisan key:generate --no-interaction \
    && npm run build \
    && rm -f .env database/database.sqlite

# ============================================================
# Stage 2: Production runtime – PHP 8.4-FPM + Nginx
# ============================================================
FROM php:8.4-fpm-alpine AS runtime

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl \
        opcache \
    && rm -rf /var/cache/apk/*

# Install Composer (needed for dev bind-mount workflow)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Nginx & Supervisor configuration
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy custom PHP settings
COPY docker/php/local.ini /usr/local/etc/php/conf.d/local.ini

# Copy entrypoint script (sed strips Windows CRLF line endings)
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html

# Copy application code
COPY --chown=www-data:www-data . .

# Copy Composer dependencies from build stage
COPY --from=build --chown=www-data:www-data /app/vendor ./vendor

# Copy built frontend assets from build stage
COPY --from=build --chown=www-data:www-data /app/public/build ./public/build

# Ensure storage & cache directories are writable
RUN mkdir -p \
    storage/logs \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose HTTP port
EXPOSE 80

# Start Nginx + PHP-FPM via Supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
