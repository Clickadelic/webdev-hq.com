import { createInertiaApp } from '@inertiajs/react';
import react from '@vitejs/plugin-react';
import assert from 'node:assert/strict';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';
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
                '@': jsRoot,
            },
        },
        plugins: [
            {
                name: 'test-dashboard-layout',
                enforce: 'pre',
                load(id) {
                    if (id.replaceAll('\\', '/').endsWith('/layouts/dashboard-layout/index.tsx')) {
                        return 'export default function AppLayout({ children }) { return children; }';
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

for (const [label, post] of [
    ['new post', undefined],
    [
        'existing post',
        {
            id: 'post-id',
            title: 'Post',
            slug: 'post',
            content: 'Content',
            status: 'draft',
            featured_image: 'https://example.com/image.jpg',
        },
    ],
]) {
    test(`${label} form accepts image uploads`, async () => {
        const { default: PostForm } = await server.ssrLoadModule('/resources/js/components/forms/post-form.tsx');
        const { body } = await createInertiaApp({
            page: {
                component: 'post-form',
                url: '/dashboard/posts',
                version: null,
                props: { post },
            },
            resolve: () => PostForm,
            render: renderToString,
            setup: ({ App, props }) => React.createElement(App, props),
        });

        assert.match(body, /<input(?=[^>]*id="featured_image_upload")(?=[^>]*type="file")/);
        assert.doesNotMatch(body, /Featured Image URL/);
        if (post) {
            assert.match(body, /https:\/\/example\.com\/image\.jpg/);
            assert.match(body, /Remove current image/);
        }
    });
}

test('only the post owner can choose its team', async () => {
    const { default: PostForm } = await server.ssrLoadModule('/resources/js/components/forms/post-form.tsx');
    const post = { id: 'post-id', title: 'Post', slug: 'post', content: 'Content', status: 'draft', team_id: 1 };
    for (const canAssignTeam of [true, false]) {
        const { body } = await createInertiaApp({
            page: {
                component: 'post-form',
                url: '/dashboard/posts/post-id/edit',
                version: null,
                props: { post, canAssignTeam, availableTeams: [{ id: 1, name: 'Editors' }] },
            },
            resolve: () => PostForm,
            render: renderToString,
            setup: ({ App, props }) => React.createElement(App, props),
        });
        assert.equal(body.includes('id="post-team"'), canAssignTeam);
    }
});

test('dashboard post actions are shown only when permitted', async () => {
    const { default: PostsIndex } = await server.ssrLoadModule('/resources/js/pages/dashboard/posts/index.tsx');
    const { body } = await createInertiaApp({
        page: {
            component: 'posts-index',
            url: '/dashboard/posts',
            version: null,
            props: {
                posts: {
                    data: [
                        { id: 'owned', title: 'Owned post', status: 'draft', can_manage: true },
                        { id: 'other', title: 'Other post', status: 'draft', can_manage: false },
                    ],
                    total: 2,
                    last_page: 1,
                },
            },
        },
        resolve: () => PostsIndex,
        render: renderToString,
        setup: ({ App, props }) => React.createElement(App, props),
    });

    const rows = [...body.matchAll(/<tr\b[^>]*>.*?<\/tr>/g)].map((match) => match[0]);
    const owned = rows.find((row) => row.includes('Owned post'));
    const other = rows.find((row) => row.includes('Other post'));
    assert.match(owned, /href="\/dashboard\/posts\/owned\/edit"/);
    assert.match(owned, />Delete<\/button>/);
    assert.doesNotMatch(other, />Delete<\/button>|\/dashboard\/posts\/other\/edit/);
});
