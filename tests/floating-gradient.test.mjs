import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { GradFlow } from 'gradflow';
import { createServer } from 'vite';

let server;
let FloatingGradient;

before(async () => {
    server = await createServer({
        configFile: false,
        server: { middlewareMode: true, hmr: false, watch: null },
        appType: 'custom',
        logLevel: 'error',
        resolve: { alias: { '@': fileURLToPath(new URL('../resources/js', import.meta.url)) } },
        plugins: [react()],
    });
    ({ default: FloatingGradient } = await server.ssrLoadModule('/resources/js/components/floating-gradient.tsx'));
});

after(async () => {
    await server?.close();
});

for (const [label, props, interactive] of [
    ['default', {}, false],
    ['enabled', { isInteractive: true }, true],
    ['disabled', { isInteractive: false }, false],
]) {
    test(`floating gradient passes ${label} interactivity to GradFlow`, () => {
        const gradient = FloatingGradient(props).props.children;

        assert.equal(gradient.type, GradFlow);
        assert.equal(gradient.props.interactive, interactive);
        assert.equal(gradient.props.config.type, 'fold');
    });
}
