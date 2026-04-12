import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
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
