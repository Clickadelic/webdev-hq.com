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
let PublicHeader;

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
                '@': jsRoot,
            },
        },
        plugins: [
            {
                name: 'test-media-query',
                enforce: 'pre',
                load(id) {
                    if (id.replaceAll('\\', '/').endsWith('/hooks/use-media-query.tsx')) {
                        return 'export const useMediaQuery = () => false';
                    }
                },
            },
            react(),
        ],
    });
    ({ default: PublicHeader } = await server.ssrLoadModule('/resources/js/layouts/public-layout/public-header.tsx'));
});

after(async () => {
    await server?.close();
});

for (const [url, expectedHref, current] of [
    ['/', '/', 'page'],
    ['/?ref=home', '/', 'page'],
    ['/hyperlinks?search=react', '/hyperlinks', 'page'],
    ['/posts/', '/posts', 'page'],
    ['/posts/example?preview=1', '/posts', 'location'],
    ['/chrome-extensions', '/chrome-extensions', 'page'],
    ['/posts-other', null, null],
    ['/legal/disclaimer', null, null],
]) {
    test(`public header marks the correct link for ${url}`, async () => {
        const { body } = await createInertiaApp({
            page: { component: 'Header', url, version: null, props: { auth: { user: null } } },
            resolve: () => PublicHeader,
            render: renderToString,
            setup: ({ App, props }) => React.createElement(App, props),
        });

        const activeLinks = [...body.matchAll(/<a\b[^>]*aria-current="(page|location)"[^>]*>/g)];
        assert.equal(activeLinks.length, expectedHref === null ? 0 : 1);
        if (expectedHref !== null) {
            assert.match(activeLinks[0][0], new RegExp(`href="${expectedHref}"`));
            assert.match(activeLinks[0][0], /class="[^"]*\btext-primary\b[^"]*"/);
            assert.match(activeLinks[0][0], /class="[^"]*\bfont-semibold\b[^"]*"/);
            assert.equal(activeLinks[0][1], current);
        }
    });
}
