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
                '@': jsRoot,
            },
        },
        plugins: [react()],
    });
});

after(async () => {
    await server?.close();
});

for (const [label, post] of [
    ['new post', undefined],
    ['existing post', {
        id: 'post-id',
        title: 'Post',
        slug: 'post',
        content: 'Content',
        status: 'draft',
        featured_image: 'https://example.com/image.jpg',
    }],
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
