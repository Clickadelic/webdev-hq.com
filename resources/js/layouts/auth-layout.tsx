import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren, useEffect, useState } from 'react';
interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    // Use API JSON mode and preload the image to avoid first-paint flicker.
    const apiBase = import.meta.env.APP_URL;
    const today = new Date().toISOString().slice(0, 10);
    const jsonUrl = `${apiBase}/api/background/seasonal?strategy=daily&variant=full&fit=crop&w=1920&h=1080&response=json&d=${encodeURIComponent(today)}`;
    const redirectUrl = `${apiBase}/api/background/seasonal?strategy=daily&variant=full&fit=crop&w=1920&h=1080&d=${encodeURIComponent(today)}`;
    const [bgUrl, setBgUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [attribution, setAttribution] = useState<{
        authorName: string;
        authorUrl: string;
        photoUrl: string;
    } | null>(null);

    useEffect(() => {
        let canceled = false;
        const controller = new AbortController();

        const preload = (url: string) =>
            new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = (e) => reject(e);
                img.src = url;
            });

        async function run() {
            try {
                const res = await fetch(jsonUrl, {
                    signal: controller.signal,
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                // Set blurred low-res preview immediately if available
                const low = (data?.photo?.urls?.small ??
                    data?.photo?.urls?.thumb) as string | undefined;
                if (low && !canceled) {
                    const sepLow = low.includes('?') ? '&' : '?';
                    setPreviewUrl(
                        `${low}${sepLow}d=${encodeURIComponent(today)}`,
                    );
                }

                // Extract Unsplash attribution
                const authorName = data?.photo?.user?.name as
                    | string
                    | undefined;
                const authorUrl = data?.photo?.user?.links?.html as
                    | string
                    | undefined;
                const photoUrl = data?.photo?.links?.html as string | undefined;
                if (authorName && authorUrl && photoUrl && !canceled) {
                    setAttribution({ authorName, authorUrl, photoUrl });
                }

                let url: string = data?.url ?? redirectUrl;
                const sep = url.includes('?') ? '&' : '?';
                url = `${url}${sep}d=${encodeURIComponent(today)}`;
                await preload(url);
                if (!canceled) setBgUrl(url);
            } catch {
                try {
                    // Fallback: use redirect URL as both preview and final
                    if (!canceled) setPreviewUrl(redirectUrl);
                    await preload(redirectUrl);
                    if (!canceled) setBgUrl(redirectUrl);
                } catch {
                    // leave plain background
                }
            }
        }

        run();
        return () => {
            canceled = true;
            controller.abort();
        };
    }, [jsonUrl, redirectUrl, today]);

    return (
        <div className="relative z-0 flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-background p-6 md:p-10">
            {/* Blurred low-res background layer */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: previewUrl
                        ? `url('${previewUrl}')`
                        : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(16px) brightness(0.9)',
                    transform: 'scale(1.06)',
                    transition: 'opacity 200ms ease-out',
                    opacity: previewUrl ? 1 : 0,
                }}
            />
            {/* Hi-res background layer fades in after preload */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10 transition-opacity duration-500 ease-out"
                style={{
                    backgroundImage: bgUrl ? `url('${bgUrl}')` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: bgUrl ? 1 : 0,
                }}
            />
            <div className="w-full max-w-sm">
                <div className="rounded-xl bg-white/30 p-2 dark:bg-neutral-900/30">
                    <div className="flex flex-col gap-8 rounded-md bg-gray-100 p-8 dark:bg-neutral-900">
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href={home()}
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                    <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                                <p className="text-center text-sm text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>

                {/* Unsplash attribution – below login box on mobile */}
                {attribution && (
                    <div className="mt-3 text-center text-xs text-white/70 md:hidden">
                        <a
                            href={attribution.photoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white"
                        >
                            Photo
                        </a>{' '}
                        by{' '}
                        <a
                            href={attribution.authorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white"
                        >
                            {attribution.authorName}
                        </a>{' '}
                        on{' '}
                        <a
                            href="https://unsplash.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white"
                        >
                            Unsplash
                        </a>
                    </div>
                )}
            </div>

            {/* Unsplash attribution – bottom-left on desktop */}
            {attribution && (
                <div className="absolute bottom-4 left-4 hidden text-xs text-white/70 md:block">
                    <a
                        href={attribution.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                    >
                        Photo
                    </a>{' '}
                    by{' '}
                    <a
                        href={attribution.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                    >
                        {attribution.authorName}
                    </a>{' '}
                    on{' '}
                    <a
                        href="https://unsplash.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                    >
                        Unsplash
                    </a>
                </div>
            )}
        </div>
    );
}
