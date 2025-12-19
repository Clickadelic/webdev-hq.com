# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project summary
- Laravel 12 + Inertia.js + React 19, built with Vite 7 and Tailwind CSS 4.
- UI primitives largely come from shadcn/radix-based components under `resources/js/components` and `resources/js/components/ui`.
- Server-side rendering (SSR) is wired via Inertia; the SSR entry is `resources/js/ssr.tsx` and is managed by Artisan (`php artisan inertia:start-ssr`).
- Auth flows are handled by Laravel Fortify with 2FA; routing lives in `routes/*.php`; the SPA shell is `resources/views/app.blade.php`.

Tooling and package managers
- PHP/composer for the Laravel app; Node/Vite for the React frontend.
- ESLint (flat config), Prettier, and TypeScript are configured. TS path alias: `@/* → resources/js/*`.

Setup
- One-shot project setup (installs PHP + Node deps, creates `.env`, keys, migrates, builds):
  - composer run setup

Core dev commands
- Full-stack dev (PHP server + queue + Vite dev):
  - composer run dev
- Full-stack dev with SSR (adds logs + Inertia SSR server):
  - composer run dev:ssr
- Frontend-only Vite dev (if you’re already running PHP separately):
  - npm run dev
- Alternative 2-process dev (PHP + Vite) without queue/logs (defined in package.json):
  - npm run dev-all

Build
- Client build only:
  - npm run build
- Build client + SSR bundles:
  - npm run build:ssr

Testing (Pest/Laravel test runner)
- Run the whole suite (clears config cache first via composer script):
  - composer test
- Run a single file:
  - php artisan test tests/Feature/DashboardTest.php
- Run by test class/name filter:
  - php artisan test --filter=TwoFactorAuthenticationTest
  - php artisan test --filter="it updates the user profile"
- (Optional) Use Pest directly after `composer install`:
  - vendor/bin/pest -t "register" tests/Feature/Auth/RegistrationTest.php

Linting, formatting, and types
- ESLint (JS/TS/React; runs with `--fix`):
  - npm run lint
- Prettier write/check (scoped to `resources/`):
  - npm run format
  - npm run format:check
- TS typecheck (no emit):
  - npm run types
- PHP code style (Laravel Pint is installed as a dev dependency):
  - vendor/bin/pint -v

Repository structure (big picture)
- HTTP entry: `public/index.php` bootstraps Laravel (`bootstrap/app.php`).
- Routes: `routes/web.php` (main web), `routes/settings.php` (settings area), `routes/console.php` (artisan tasks).
- Controllers/middleware: `app/Http/Controllers/**`, SSR + shared props via `app/Http/Middleware/HandleInertiaRequests.php`.
- Frontend app: `resources/js` with `pages/**` (Inertia pages), `layouts/**`, `components/**`, hooks in `hooks/**`, and helpers in `lib/utils.ts`.
- SPA shell: `resources/views/app.blade.php` mounts the Inertia app and loads Vite assets. Vite inputs are `resources/css/app.css` and `resources/js/app.tsx` (see `vite.config.ts`).
- Build tooling: `vite.config.ts` integrates `laravel-vite-plugin`, React, Tailwind CSS v4 (@tailwindcss/vite), and Wayfinder.
- Auth: Fortify providers and actions live under `app/Providers/*` and `app/Actions/Fortify/*`.
- Tests: Pest is configured in `tests/Pest.php`; feature/unit suites under `tests/Feature/**` and `tests/Unit/**`.

Conventions and gotchas specific to this repo
- TS alias `@/*` resolves to `resources/js/*` (defined in `tsconfig.json`).
- ESLint ignores: `vendor`, `node_modules`, `public`, `bootstrap/ssr`, and `tailwind.config.js`.
- The Wayfinder Vite plugin is enabled with `{ formVariants: true }` and Laravel Wayfinder is required in `composer.json`.

References
- High-level README: `README.md` (states stack: Laravel, Inertia, React shadcn).
- Primary configs: `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `composer.json`, `package.json`.
