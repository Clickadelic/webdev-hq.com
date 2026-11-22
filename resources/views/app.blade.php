<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }

            .initial-loader {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                padding: 1.5rem;
                background: #fff;
                color: #171717;
                font-family: system-ui, sans-serif;
                text-align: center;
            }

            html.dark .initial-loader {
                background: #171717;
                color: #fafafa;
            }

            .initial-loader__spinner {
                width: 2rem;
                height: 2rem;
                border: 3px solid #a3a3a3;
                border-top-color: #1a90fd;
                border-radius: 50%;
                animation: initial-loader-spin 0.8s linear infinite;
            }

            .initial-loader--delayed .initial-loader__spinner {
                display: none;
            }

            .initial-loader a {
                color: #1a90fd;
            }

            @keyframes initial-loader-spin {
                to { transform: rotate(360deg); }
            }

            @media (prefers-reduced-motion: reduce) {
                .initial-loader__spinner {
                    animation: none;
                }
            }
        </style>

        <title data-inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <div id="initial-loader" class="initial-loader" role="status" aria-live="polite">
            <div class="initial-loader__spinner" aria-hidden="true"></div>
            <span id="initial-loader-message">Loading WebDev HQ...</span>
            <a id="initial-loader-retry" href="" hidden>Reload the page</a>
        </div>
        @inertia
        <noscript>
            <style>.initial-loader { display: none; }</style>
            <p>JavaScript is required for full functionality.</p>
        </noscript>
        <script id="initial-loader-script">
            (() => {
                const loader = document.getElementById('initial-loader');
                const message = document.getElementById('initial-loader-message');
                const retry = document.getElementById('initial-loader-retry');
                const app = document.getElementById('app');

                const showDelay = () => {
                    loader.classList.add('initial-loader--delayed');
                    message.textContent = 'The page is taking longer than expected. Check your connection and try again.';
                    retry.hidden = false;
                };

                if (!app) {
                    showDelay();
                    return;
                }

                if (app.hasChildNodes()) {
                    loader.remove();
                    return;
                }

                const observer = new MutationObserver(() => {
                    if (app.hasChildNodes()) {
                        observer.disconnect();
                        window.clearTimeout(timeout);
                        loader.remove();
                    }
                });
                observer.observe(app, { childList: true });

                const timeout = window.setTimeout(showDelay, 20000);
            })();
        </script>
    </body>
</html>
