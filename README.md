# webdev-hq.com

Main domain of webdev-hq.com — Laravel 12, Inertia.js, React, ShadCN UI, MySQL.

## Local Development Setup

### Docker (Recommended)

The project includes a Docker Compose setup with hot module replacement (HMR) for fast frontend development.

**Requirements:**
- Docker Desktop with Compose v2

**Start the development environment:**
```bash
docker compose up --watch
```

This starts:
- **Laravel app** at http://localhost:8000 (PHP-FPM + Nginx)
- **Vite dev server** at http://localhost:5173 (HMR enabled)
- **MySQL 8** at localhost:3306
- **phpMyAdmin** at http://localhost:8080

**How it works:**
- Frontend code (`resources/`, `public/`) uses bind mounts for instant HMR updates
- Backend code (`app/`, `routes/`, `config/`) uses Compose Watch sync
- The Vite `hot` file is shared between containers so Laravel knows to use the dev server

**Rebuild after dependency changes:**
```bash
docker compose down
docker compose build --no-cache
docker compose up --watch
```

### Native (without Docker)

**Requirements:**
- PHP 8.4
- Composer
- MySQL
### Install
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

### Windows: SSL Certificate Fix

PHP on Windows ships without a CA bundle, which causes `cURL error 60` when making HTTPS requests (e.g. to the Unsplash API). Fix it once per machine:

1. Download the Mozilla CA bundle:
    ```powershell
    Invoke-WebRequest -Uri "https://curl.se/ca/cacert.pem" -OutFile "$env:USERPROFILE\scoop\apps\php84\current\cacert.pem"
    ```
2. Enable it in `php.ini` (find path with `php --ini`):
    ```ini
    curl.cainfo = "C:\path\to\cacert.pem"
    openssl.cafile = "C:\path\to\cacert.pem"
    ```

## Unsplash Image API

### Endpoints

| Method | URL                            | Description                                           |
| ------ | ------------------------------ | ----------------------------------------------------- |
| GET    | `/api/unsplash/image/seasonal` | Random photo for the current (or specified) season    |
| GET    | `/api/unsplash/image/general`  | Random photo from all configured seasonal collections |

### Query Parameters

Both endpoints accept optional collection ID overrides (all formats are equivalent):

- `collections=ID1,ID2` — comma-separated string
- `collection_ids[]=ID1&collection_ids[]=ID2` — array
- `collection_id=ID1` — single ID
  The `/seasonal` endpoint additionally accepts:
- `season=spring|summer|autumn|winter` — override auto-detected season

### Required Environment Variables

```env
UNSPLASH_ACCESS_KEY=your_access_key
UNSPLASH_COLLECTION_SPRING_ID=collection_id
UNSPLASH_COLLECTION_SUMMER_ID=collection_id
UNSPLASH_COLLECTION_AUTUMN_ID=collection_id
UNSPLASH_COLLECTION_WINTER_ID=collection_id
```

### Response Shape

```json
{
  "data": { "id", "description", "urls": { "raw", "full", "regular", "small", "thumb" }, "user", ... },
  "meta": { "season", "collection_ids", "cached" }
}
```

Responses are cached for 24 hours per season/collection combination.

## Running Tests

```bash
php artisan test
```

## Test
