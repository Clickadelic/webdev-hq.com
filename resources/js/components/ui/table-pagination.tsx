import { cn } from '@/lib/utils';
import { type Paginator } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps<T> {
    paginator: Paginator<T>;
    className?: string;
}

/** Returns an array of page numbers with '...' ellipsis where needed. */
function getPageNumbers(current: number, last: number): (number | '...')[] {
    if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

    const pages: (number | '...')[] = [1];

    if (current > 3) pages.push('...');

    for (let i = Math.max(2, current - 1); i <= Math.min(last - 1, current + 1); i++) {
        pages.push(i);
    }

    if (current < last - 2) pages.push('...');

    pages.push(last);

    return pages;
}

export default function TablePagination<T>({ paginator, className }: TablePaginationProps<T>) {
    const { current_page, last_page, total, from, to, prev_page_url, next_page_url } = paginator;

    // Build URL for any page number, preserving existing query params.
    const currentUrl = usePage().url;
    const pageUrl = (page: number): string => {
        const url = new URL(currentUrl, window.location.origin);
        url.searchParams.set('page', String(page));
        return url.pathname + url.search;
    };

    if (last_page <= 1) return null;

    const pageNumbers = getPageNumbers(current_page, last_page);
    const navigate = (url: string) =>
        router.visit(url, { preserveScroll: true, preserveState: true });

    return (
        <div className={cn('flex items-center justify-between py-3', className)}>
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{from}</span>–
                <span className="font-medium">{to}</span> of{' '}
                <span className="font-medium">{total}</span>
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => prev_page_url && navigate(prev_page_url)}
                    disabled={!prev_page_url}
                    aria-label="Previous page"
                    className={cn(
                        'inline-flex items-center justify-center rounded-md border px-2 py-1.5 text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'disabled:pointer-events-none disabled:opacity-40',
                    )}
                >
                    <ChevronLeft className="size-4" />
                </button>

                {pageNumbers.map((page, idx) =>
                    page === '...' ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="px-2 text-sm text-muted-foreground"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => navigate(pageUrl(page))}
                            aria-label={`Page ${page}`}
                            aria-current={page === current_page ? 'page' : undefined}
                            className={cn(
                                'inline-flex min-w-8 items-center justify-center rounded-md border px-2 py-1.5 text-sm transition-colors',
                                page === current_page
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'hover:bg-accent hover:text-accent-foreground',
                            )}
                        >
                            {page}
                        </button>
                    ),
                )}

                <button
                    onClick={() => next_page_url && navigate(next_page_url)}
                    disabled={!next_page_url}
                    aria-label="Next page"
                    className={cn(
                        'inline-flex items-center justify-center rounded-md border px-2 py-1.5 text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'disabled:pointer-events-none disabled:opacity-40',
                    )}
                >
                    <ChevronRight className="size-4" />
                </button>
            </div>
        </div>
    );
}
