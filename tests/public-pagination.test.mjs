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
                '@/actions': path.join(jsRoot, 'wayfinder'),
                '@/routes': path.join(jsRoot, 'wayfinder/routes'),
                '@': jsRoot,
            },
        },
        plugins: [{
            name: 'test-public-layout',
            enforce: 'pre',
            load(id) {
                if (id.replaceAll('\\', '/').endsWith('/layouts/public-layout/index.tsx')) {
                    return 'export default function PublicLayout({ children }) { return children; }';
                }
            },
        }, react()],
    });
});

after(async () => {
    await server?.close();
});

for (const [page, prop, item] of [
    ['posts', 'posts', { id: '1', slug: 'post', title: 'Post' }],
    ['hyperlinks', 'hyperlinks', { id: '1', url: 'https://example.com', title: 'Link', favicon_url: 'https://example.com/favicon.ico' }],
]) {
    test(`${page} exposes page links and preserves query parameters`, async () => {
        const { default: Page } = await server.ssrLoadModule(`/resources/js/pages/${page}/index.tsx`);
        const paginator = {
            data: [item],
            current_page: 4,
            last_page: 10,
            from: 4,
            to: 4,
            total: 10,
            prev_page_url: `/${page}?search=react&page=3`,
            next_page_url: `/${page}?search=react&page=5`,
        };
        const { body } = await createInertiaApp({
            page: {
                component: page,
                url: `/${page}?search=react&page=4`,
                version: null,
                props: { [prop]: paginator, auth: { user: null } },
            },
            resolve: () => Page,
            render: renderToString,
            setup: ({ App, props }) => React.createElement(App, props),
        });

        assert.match(body, new RegExp(`<a\\b(?=[^>]*href="/${page}\\?search=react&amp;page=10")(?=[^>]*aria-label="Page 10")`));
        assert.match(body, /<a\b(?=[^>]*aria-label="Page 4")(?=[^>]*aria-current="page")/);
        assert.match(body, /…/);
    });
}

test('pagination hides for a single page and disables unavailable navigation', async () => {
    const { default: Pagination } = await server.ssrLoadModule('/resources/js/components/ui/table-pagination.tsx');
    const render = async (lastPage) => {
        const { body } = await createInertiaApp({
            page: {
                component: 'pagination',
                url: '/posts',
                version: null,
                props: { paginator: {
                    current_page: 1,
                    last_page: lastPage,
                    from: 1,
                    to: 1,
                    total: lastPage,
                    prev_page_url: null,
                    next_page_url: lastPage > 1 ? '/posts?page=2' : null,
                } },
            },
            resolve: () => Pagination,
            render: renderToString,
            setup: ({ App, props }) => React.createElement(App, props),
        });
        return body;
    };

    assert.doesNotMatch(await render(1), /aria-label="(?:Previous page|Page \d+|Next page)"/);
    assert.match(await render(2), /<button\b(?=[^>]*disabled="")(?=[^>]*aria-label="Previous page")/);
});
