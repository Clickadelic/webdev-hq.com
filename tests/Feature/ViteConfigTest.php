<?php

beforeEach(function () {
    $this->viteConfigPath = base_path('vite.config.ts');
    $this->viteConfig = file_get_contents($this->viteConfigPath);
});

describe('Vite Configuration', function () {
    describe('HMR Settings', function () {
        it('has server host set to 0.0.0.0 for container access', function () {
            expect($this->viteConfig)->toContain("host: '0.0.0.0'");
        });

        it('has HMR configured for localhost', function () {
            expect($this->viteConfig)->toContain("hmr: {");
            expect($this->viteConfig)->toContain("host: 'localhost'");
            expect($this->viteConfig)->toContain("port: 5173");
            expect($this->viteConfig)->toContain("protocol: 'ws'");
        });

        it('has file watching with polling enabled for Docker compatibility', function () {
            expect($this->viteConfig)->toContain('usePolling: true');
        });

        it('has reasonable polling interval', function () {
            expect($this->viteConfig)->toContain('interval: 100');
        });
    });

    describe('Watch Exclusions', function () {
        it('excludes wayfinder generated files from watch', function () {
            expect($this->viteConfig)->toContain('**/resources/js/wayfinder/**');
        });

        it('excludes actions generated files from watch', function () {
            expect($this->viteConfig)->toContain('**/resources/js/actions/**');
        });

        it('excludes routes generated files from watch', function () {
            expect($this->viteConfig)->toContain('**/resources/js/routes/**');
        });
    });

    describe('Required Plugins', function () {
        it('includes laravel vite plugin', function () {
            expect($this->viteConfig)->toContain("import laravel from 'laravel-vite-plugin'");
            expect($this->viteConfig)->toContain('laravel({');
        });

        it('includes react plugin', function () {
            expect($this->viteConfig)->toContain("import react from '@vitejs/plugin-react'");
            expect($this->viteConfig)->toContain('react({');
        });

        it('includes tailwindcss plugin', function () {
            expect($this->viteConfig)->toContain("import tailwindcss from '@tailwindcss/vite'");
            expect($this->viteConfig)->toContain('tailwindcss()');
        });

        it('includes wayfinder plugin', function () {
            expect($this->viteConfig)->toContain("import { wayfinder } from '@laravel/vite-plugin-wayfinder'");
            expect($this->viteConfig)->toContain('wayfinder()');
        });
    });

    describe('Laravel Plugin Configuration', function () {
        it('has refresh enabled for full page reload support', function () {
            expect($this->viteConfig)->toContain('refresh: true');
        });

        it('configures correct entry points', function () {
            expect($this->viteConfig)->toContain("'resources/css/app.css'");
            expect($this->viteConfig)->toContain("'resources/js/app.tsx'");
        });

        it('configures SSR entry point', function () {
            expect($this->viteConfig)->toContain("ssr: 'resources/js/ssr.tsx'");
        });
    });
});
