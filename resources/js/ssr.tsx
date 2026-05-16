import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { type ComponentType } from 'react';
import ReactDOMServer from 'react-dom/server';

const appName = import.meta.env.VITE_APP_NAME || 'WebDev HQ';

type PageModule = ComponentType & { default?: ComponentType };
const pages = import.meta.glob<PageModule>('./pages/**/*.tsx');

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} &middot; ${appName}` : appName),
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, pages),
        setup: ({ App, props }) => <App {...props} />,
    }),
);
