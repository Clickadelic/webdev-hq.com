import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ResolvableUrl = NonNullable<InertiaLinkProps['href']> | URL;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(url1: ResolvableUrl, url2: ResolvableUrl) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: ResolvableUrl): string {
    if (typeof url === 'string') {
        return url;
    }

    if ('url' in url && typeof url.url === 'string') {
        return url.url;
    }

    return String(url);
}

export function getFaviconUrl(websiteUrl: string, size = 32): string {
    if (websiteUrl) {
        try {
            const url = new URL(websiteUrl);
            return `https://www.google.com/s2/favicons?sz=${size}&domain_url=${url.origin}`;
        } catch {
            return '/assets/icons/default-favicon.png';
        }
    } else {
        return '/assets/icons/default-favicon.png';
    }
}

export const dailySalutation = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
        return 'good_morning';
    } else if (hours < 18) {
        return 'good_afternoon';
    } else {
        return 'good_evening';
    }
};

export function formatIsoDate(isoString: string | Date) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
