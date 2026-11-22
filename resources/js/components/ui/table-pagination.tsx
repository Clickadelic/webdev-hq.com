import { cn } from '@/lib/utils';
import { type Paginator } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps<T> {
    paginator: Paginator<T>;
    className?: string;
    preserveScroll?: boolean;
    preserveState?: boolean;
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

export default function TablePagination<T>({
    paginator,
    className,
    preserveScroll = true,
    preserveState = true,
}: TablePaginationProps<T>) {
    const { current_page, last_page, total, from, to, prev_page_url, next_page_url } = paginator;

    // Build URL for any page number, preserving existing query params.
    const currentUrl = usePage().url;
    const pageUrl = (page: number): string => {
        const url = new URL(currentUrl, 'http://localhost');
        url.searchParams.set('page', String(page));
        return url.pathname + url.search;
    };

    if (last_page <= 1) return null;

    const pageNumbers = getPageNumbers(current_page, last_page);
    const navigate = (url: string) =>
        router.visit(url, { preserveScroll, preserveState });

    return (

		<div className={cn("flex flex-col items-center justify-between", className)}>
			<div className="flex items-center gap-1">
				<button
					onClick={() => prev_page_url && navigate(prev_page_url)}
					disabled={!prev_page_url}
					aria-label="Previous page"
					title="Previous page"
					className={cn(
						'bg-white/30 dark:bg-neutral-900/30 backdrop-blur p-1 inline-flex items-center justify-center rounded-md text-sm transition-colors',
						'hover:bg-accent hover:text-primary hover:cursor-pointer',
						'disabled:pointer-events-none disabled:opacity-40',
					)}
				>
					<div className="bg-white dark:bg-neutral-900 rounded-sm p-2">
						<ChevronLeft className="size-4" />
					</div>
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
						<Link
							key={page}
							href={pageUrl(page)}
							preserveScroll={preserveScroll}
							preserveState={preserveState}
							aria-label={`Page ${page}`}
							aria-current={page === current_page ? 'page' : undefined}
							className={cn(
								'bg-white/30 dark:bg-neutral-900/30 rounded-lg p-1 backdrop-blur',
								page === current_page
									? 'bg-primary/30 text-primary font-medium'
									: 'hover:text-primary',
							)}
						>
							<div className="bg-white dark:bg-neutral-900 py-1 px-3 rounded-sm">
								{page}
							</div>
						</Link>
					),
				)}

				<button
					onClick={() => next_page_url && navigate(next_page_url)}
					disabled={!next_page_url}
					aria-label="Next page"
					title="Next page"
					className={cn(
						'bg-white/30 dark:bg-neutral-900/30 backdrop-blur p-1 inline-flex items-center justify-center rounded-md text-sm transition-colors',
						'hover:bg-accent hover:text-primary hover:cursor-pointer',
						'disabled:pointer-events-none disabled:opacity-40',
					)}
				>
					<div className="bg-white dark:bg-neutral-900 rounded-sm p-2">
						<ChevronRight className="size-4" />
					</div>
				</button>
			</div>

			<div className="bg-white/30 dark:bg-neutral-900/30 backdrop-blur px-3 py-2 rounded-sm mt-3">
				Showing <span className="font-medium">{from}</span>–
				<span className="font-medium">{to}</span> of{' '}
				<span className="font-medium">{total} items.</span>
			</div>
		</div>
    );
}
