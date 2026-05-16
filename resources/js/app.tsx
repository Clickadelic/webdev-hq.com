import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { type ComponentType } from 'react';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'WebDev HQ';

type PageModule = ComponentType & { default?: ComponentType };
const pages = import.meta.glob<PageModule>('./pages/**/*.tsx');

createInertiaApp({
    title: (title) => (title ? `${title} &middot; ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, pages),
    progress: {
        color: '#1a90fd',
    },
    strictMode: true,
});

// This will set light / dark mode on load...
initializeTheme();
