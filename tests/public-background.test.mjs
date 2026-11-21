import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInertiaApp } from '@inertiajs/react';
import react from '@vitejs/plugin-react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

let server;

before(async () => {
    const jsRoot = fileURLToPath(new URL('../resources/js', import.meta.url));
    server = await createServer({
        configFile: false,
        server: { middlewareMode: true, hmr: false, watch: null },
        appType: 'custom',
        logLevel: 'error',
        resolve: {
            alias: {
                '@/routes': path.join(jsRoot, 'wayfinder/routes'),
                '@/actions': path.join(jsRoot, 'wayfinder'),
                '@/images': path.join(jsRoot, '../images'),
                '@': jsRoot,
            },
        },
        plugins: [
            {
                name: 'test-background',
                enforce: 'pre',
                load(id) {
                    const normalized = id.replaceAll('\\', '/');
                    if (normalized.endsWith('/hooks/use-media-query.tsx')) {
                        return 'export const useMediaQuery = () => false';
                    }
                    if (normalized.endsWith('/components/floating-gradient.tsx')) {
                        return `import { createElement } from 'react';
                            export default function FloatingGradient({ isInteractive = false }) {
                                return createElement('canvas', { 'data-interactive': String(isInteractive) });
                            }`;
                    }
                },
            },
            react(),
        ],
    });
});

after(async () => {
    await server?.close();
});

for (const [component, url, props, interactive] of [
    ['index', '/', { hyperlinkCount: 0 }, true],
    ['legal/disclaimer', '/legal/disclaimer', {}, false],
    ['chrome-extensions/index', '/chrome-extensions', {}, false],
    ['posts/index', '/posts', { posts: { data: [], last_page: 1 } }, false],
    ['hyperlinks/index', '/hyperlinks', { hyperlinks: { data: [], total: 0 } }, false],
]) {
    test(`${url} has ${interactive ? 'an interactive' : 'a non-interactive'} gradient`, async () => {
        const { default: Page } = await server.ssrLoadModule(`/resources/js/pages/${component}.tsx`);
        const { body } = await createInertiaApp({
            page: {
                component,
                url,
                version: null,
                props: { auth: { user: null }, categories: [], tags: [], ...props },
            },
            resolve: () => Page,
            render: renderToString,
            setup: ({ App, props: appProps }) => React.createElement(App, appProps),
        });

        assert.match(body, new RegExp(`<canvas data-interactive="${interactive}"></canvas>`));
    });
}
