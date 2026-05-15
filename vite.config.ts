import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        babel({
            presets: [reactCompilerPreset()],
        }),
        react(),
        tailwindcss(),
        wayfinder(),
    ],
    resolve: {
        alias: [
            { find: '@/routes', replacement: path.resolve(__dirname, 'resources/js/wayfinder/routes') },
            { find: '@/actions', replacement: path.resolve(__dirname, 'resources/js/wayfinder') },
        ],
    },
    build: {
        rolldownOptions: {
            watch: {
                exclude: [
                    'resources/js/wayfinder/**',
                    'resources/js/actions/**',
                    'resources/js/routes/**',
                ],
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: 'localhost',
            port: 5173,
            protocol: 'ws',
        },
        watch: {
            usePolling: true,
            interval: 100,
            ignored: [
                '**/resources/js/wayfinder/**',
                '**/resources/js/actions/**',
                '**/resources/js/routes/**',
            ],
        },
    },
});
