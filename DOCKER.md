# Docker Setup

Run the WebDev HQ application in Docker for a portable, reproducible development environment.

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (v4.x+)
- No local PHP, Node, or MySQL installation required

## Architecture

| Service | Container | Image / Base | Port |
|---------|-----------|--------------|------|
| Laravel App (PHP-FPM + Nginx) | `webdevhq-app` | PHP 8.4-FPM Alpine | `localhost:8000` |
| MySQL Database | `webdevhq-mysql` | MySQL 8.0 | `localhost:3306` |
| Vite Dev Server (HMR) | `webdevhq-node` | Node 20 Alpine + PHP 8.4 CLI | `localhost:5173` |

## Quick Start

```bash
# 1. Clone the repository
git clone <repo-url> && cd webdev-hq.com

# 2. Copy the environment file
cp .env.example .env

# 3. Build and start all services
docker compose up -d --build

# 4. Open the app
#    http://localhost:8000
```

On first boot, the app container automatically:
- Installs Composer dependencies
- Generates an application key (if `.env` was freshly copied)
- Runs database migrations
- Starts Nginx + PHP-FPM

## Services

### App (`webdevhq-app`)

PHP 8.4-FPM + Nginx running behind Supervisor. The project directory is bind-mounted into the container, so code changes are reflected immediately. Database connection is configured via environment variables in `docker-compose.yml`, overriding anything in your local `.env`.

### MySQL (`webdevhq-mysql`)

MySQL 8.0 with a persistent named volume (`mysql-data`). Default credentials:

- **Host (from containers):** `mysql`
- **Host (from your machine):** `localhost:3306`
- **User:** `root`
- **Password:** `groot`
- **Database:** `webdevhqcom_dev`

### Node (`webdevhq-node`)

Runs the Vite dev server with hot module replacement (HMR). Includes PHP 8.4 CLI so the `@laravel/vite-plugin-wayfinder` can generate route types. The `node_modules` directory uses a named volume to avoid cross-platform issues.

## Common Commands

```bash
# Start all services
docker compose up -d

# Start and rebuild images
docker compose up -d --build

# Stop all services
docker compose down

# Stop and remove all data (including database)
docker compose down -v

# View logs (all services)
docker compose logs -f

# View logs (single service)
docker compose logs -f app

# Run artisan commands
docker compose exec app php artisan migrate
docker compose exec app php artisan tinker
docker compose exec app php artisan db:seed

# Fresh migration with seeders
docker compose exec app php artisan migrate:fresh --seed

# Run tests
docker compose exec app php artisan test

# Enter a container shell
docker compose exec app sh
docker compose exec node sh

# Run Composer commands
docker compose exec app composer require some/package

# Run npm commands inside the node container
docker compose exec node npm install some-package
```

## Production-like Build

A `docker-compose.prod.yml` override is included for production-like builds. It disables the Vite dev server and bind-mounts, relying on the multi-stage Dockerfile to bake all compiled assets into the image.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

This override also caches Laravel config, routes, and views for better performance.

## Project Structure (Docker files)

```
├── Dockerfile                  # Multi-stage: build (Node 20 + PHP 8.4) → runtime (PHP-FPM + Nginx)
├── docker-compose.yml          # Development services (app, mysql, node)
├── docker-compose.prod.yml     # Production override
├── .dockerignore               # Excludes node_modules, vendor, .env, etc.
└── docker/
    ├── entrypoint.sh           # Dev entrypoint: composer install, migrate, start supervisor
    ├── supervisord.conf        # Runs Nginx + PHP-FPM together
    ├── nginx/
    │   └── default.conf        # Nginx config serving Laravel's public/ directory
    └── php/
        └── local.ini           # PHP settings (64M uploads, 256M memory, opcache)
```

## Connecting from Your Host

If you want to connect to the Docker MySQL from a local GUI tool (e.g. TablePlus, DBeaver):

- **Host:** `127.0.0.1`
- **Port:** `3306`
- **User:** `root`
- **Password:** `groot`

## Troubleshooting

**Port conflicts:** If ports `8000`, `3306`, or `5173` are already in use, either stop the conflicting service or change the host port mapping in `docker-compose.yml` (e.g. `"8080:80"`).

**MySQL won't start:** If the MySQL container is unhealthy after changing credentials, remove the data volume and recreate: `docker compose down -v && docker compose up -d`

**Windows line endings:** Shell scripts may have CRLF line endings on Windows. The Dockerfile handles this automatically via `sed`, but if you add new scripts, ensure they are converted or add a similar `sed` step.

**Stale node_modules:** If npm packages seem outdated, remove the volume: `docker compose down -v` and restart.
