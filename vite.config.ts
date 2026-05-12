import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
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
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
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
        rollupOptions: {
            watch: {
                // Exclude wayfinder output directories to prevent infinite rebuild loop.
                // The wayfinder plugin regenerates routes which triggers Vite to rebuild,
                // which in turn triggers wayfinder again. This exclusion breaks the cycle.
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
            // Ignore wayfinder output to prevent HMR infinite loop during dev
            ignored: [
                '**/resources/js/wayfinder/**',
                '**/resources/js/actions/**',
                '**/resources/js/routes/**',
            ],
        },
    },
});
