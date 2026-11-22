import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const view = readFileSync(new URL('../resources/views/app.blade.php', import.meta.url), 'utf8');
const script = view.match(/<script id="initial-loader-script">([\s\S]*?)<\/script>/)?.[1];

assert.ok(script, 'The initial loader script must exist');

function startLoader({ rendered = false, missingApp = false } = {}) {
    let hasContent = rendered;
    let observer;
    let timer;
    let clearedTimer;
    const loader = {
        removed: false,
        delayed: false,
        classList: {
            add(name) {
                if (name === 'initial-loader--delayed') loader.delayed = true;
            },
        },
        remove() {
            this.removed = true;
        },
    };
    const message = { textContent: '' };
    const retry = { hidden: true };
    const app = { hasChildNodes: () => hasContent };
    const elements = {
        'initial-loader': loader,
        'initial-loader-message': message,
        'initial-loader-retry': retry,
        app: missingApp ? null : app,
    };

    runInNewContext(script, {
        document: { getElementById: (id) => elements[id] },
        MutationObserver: class {
            constructor(callback) {
                observer = { callback, disconnected: false };
            }
            observe() {}
            disconnect() {
                observer.disconnected = true;
            }
        },
        window: {
            setTimeout(callback) {
                timer = callback;
                return 1;
            },
            clearTimeout(id) {
                clearedTimer = id;
            },
        },
    });

    return {
        loader,
        message,
        retry,
        observer: () => observer,
        clearedTimer: () => clearedTimer,
        mount() {
            hasContent = true;
            observer.callback();
        },
        delay() {
            timer();
        },
    };
}

test('dismisses the loader when React mounts', () => {
    const page = startLoader();
    assert.equal(page.loader.removed, false);

    page.mount();
    assert.equal(page.loader.removed, true);
    assert.equal(page.observer().disconnected, true);
    assert.equal(page.clearedTimer(), 1);
});

test('does not cover server-rendered content', () => {
    const page = startLoader({ rendered: true });
    assert.equal(page.loader.removed, true);
    assert.equal(page.observer(), undefined);
});

test('shows recovery guidance if loading is delayed and still dismisses on success', () => {
    const page = startLoader();
    page.delay();
    assert.equal(page.loader.delayed, true);
    assert.match(page.message.textContent, /taking longer/);
    assert.equal(page.retry.hidden, false);

    page.mount();
    assert.equal(page.loader.removed, true);
});

test('shows recovery guidance if the app root is missing', () => {
    const page = startLoader({ missingApp: true });
    assert.equal(page.loader.delayed, true);
    assert.equal(page.retry.hidden, false);
});
