import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

const plugins = [
    laravel({
        input: ['resources/css/app.css', 'resources/js/app.tsx'],
        ssr: 'resources/js/ssr.tsx',
        refresh: true,
    }),
    react({
        // babel: {
        //     plugins: ['babel-plugin-react-compiler'],
        // },
    }),
    tailwindcss(),
];

// Skip wayfinder plugin during CI builds (types are pre-generated)
if (process.env.CI !== 'true' || process.env.GENERATE_WAYFINDER === 'true') {
    plugins.push(
        wayfinder({
            command: 'php -d memory_limit=512M artisan wayfinder:generate',
        }),
    );
}

export default defineConfig({
    plugins,
    resolve: {
        alias: [
            {
                find: '@/routes',
                replacement: path.resolve(
                    __dirname,
                    'resources/js/wayfinder/routes',
                ),
            },
            {
                find: '@/actions',
                replacement: path.resolve(__dirname, 'resources/js/wayfinder'),
            },
            {
                find: '@/images',
                replacement: path.resolve(__dirname, 'resources/images'),
            },
        ],
    },
    build: {
        rollupOptions: {
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
