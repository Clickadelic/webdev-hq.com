import { useEffect, useState, type PropsWithChildren } from 'react';
interface BackgroundImageProps {
    backgroundUrl?: string;
    collectionId?: string;
}

/**
 * A component that wraps its children with a background image, preloading the image to avoid flicker.
 *
 * @param {React.ReactNode} props.children - The children of the component
 * @param {string} props.collectionId - The ID of the Unsplash collection to use for the background image.
 * @returns {React.ReactNode} - The wrapped children
 */
export default function BackgroundImage({
    children,
    collectionId,
}: PropsWithChildren<BackgroundImageProps>) {
    // Use API JSON mode and preload the image to avoid first-paint flicker.
    const today = new Date().toISOString().slice(0, 10);
    const jsonUrl = `/api/${import.meta.env.VITE_API_VERSION}/unsplash/image/general${collectionId ? `?collectionId=${collectionId}` : ''}&strategy=daily&variant=full&fit=crop&w=1920&h=1080&response=json&d=${encodeURIComponent(today)}`;
    const redirectUrl = `/api/${import.meta.env.VITE_API_VERSION}/unsplash/image/general${collectionId ? `?collectionId=${collectionId}` : ''}&strategy=daily&variant=full&fit=crop&w=1920&h=1080&d=${encodeURIComponent(today)}`;
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
                const photo = data?.data; // Photo data is under 'data' key

                // Set blurred low-res preview immediately if available
                const low = (photo?.urls?.small ?? photo?.urls?.thumb) as string | undefined;
                if (low && !canceled) {
                    const sepLow = low.includes('?') ? '&' : '?';
                    setPreviewUrl(`${low}${sepLow}d=${encodeURIComponent(today)}`);
                }

                // Extract Unsplash attribution
                const authorName = photo?.user?.name as string | undefined;
                const authorUrl = photo?.user?.links?.html as string | undefined;
                const photoUrl = photo?.links?.html as string | undefined;
                if (authorName && authorUrl && photoUrl && !canceled) {
                    setAttribution({ authorName, authorUrl, photoUrl });
                }

                // Use full-size URL from photo data
                let url: string = photo?.urls?.full ?? photo?.urls?.regular ?? redirectUrl;
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
        <div className="relative z-0 flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-neutral-200 p-6 md:p-10 dark:bg-neutral-900">
            <div
                aria-hidden
                className="absolute inset-0 -z-10 flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-neutral-200 p-6 md:p-10 dark:bg-neutral-900"
                style={{
                    backgroundImage: previewUrl ? `url('${previewUrl}')` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(16px) brightness(0.9)',
                    transform: 'scale(1.06)',
                    transition: 'opacity 200ms ease-out',
                    opacity: previewUrl ? 1 : 0,
                }}
            />
            <div
                aria-hidden
                className="absolute inset-0 -z-10 flex min-h-svh flex-col items-center justify-center bg-cover bg-no-repeat transition-opacity duration-500 ease-out"
                style={{
                    backgroundImage: bgUrl ? `url('${bgUrl}')` : undefined,
                    backgroundPosition: 'center',
                    opacity: bgUrl ? 1 : 0,
                }}
            >
                {children}
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
        </div>
    );
}
