'use client';

import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { type Hyperlink } from '@/types';
import { router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Search,
    Tag as TagIcon,
} from 'lucide-react';
import { useState } from 'react';

interface PaginatedHyperlinks {
    data: Hyperlink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export default function Home({
    hyperlinks,
    canRegister = true,
}: {
    hyperlinks: PaginatedHyperlinks;
    canRegister?: boolean;
}) {
    const items = hyperlinks.data;
    const [query, setQuery] = useState<string>('');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get('/', query ? { search: query } : {}, {
            preserveState: true,
        });
    }

    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            {/* Search */}
            <div className="mx-auto mt-8 mb-10 w-full max-w-lg">
                <div className="rounded-xl bg-white/30 p-1 backdrop-blur dark:bg-white/5">
                    <form
                        onSubmit={handleSearch}
                        className="relative rounded-lg bg-white dark:bg-neutral-950"
                    >
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search resources…"
                            className="w-full rounded-lg py-2.5 pr-3 pl-9 text-sm placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none dark:bg-neutral-950 dark:text-white"
                        />
                    </form>
                </div>
            </div>

            {/* Results */}
            {items.length === 0 ? (
                <p className="my-16 text-center text-muted-foreground">
                    No resources available yet.
                </p>
            ) : (
                <div className="pb-12">
                    <div className="flex flex-row gap-3">
                        {items.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex w-72 flex-col gap-1 rounded-xl border border-border bg-white p-3 shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:bg-neutral-900"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="truncate text-sm leading-tight font-semibold group-hover:text-primary">
                                        {link.title}
                                    </h3>
                                    <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>

                                {link.category && (
                                    <span className="w-fit rounded-md border border-muted bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                                        {link.category.name}
                                    </span>
                                )}

                                {link.description && (
                                    <p className="line-clamp-2 text-xs text-muted-foreground">
                                        {link.description}
                                    </p>
                                )}

                                <p className="mt-auto truncate text-xs font-medium text-primary/70">
                                    {link.url.replace(/^https?:\/\//, '')}
                                </p>

                                {link.tags && link.tags.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-1">
                                        <TagIcon className="size-3 text-muted-foreground" />
                                        {link.tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Pagination */}
                    {hyperlinks.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!hyperlinks.prev_page_url}
                                onClick={() =>
                                    hyperlinks.prev_page_url &&
                                    router.get(
                                        hyperlinks.prev_page_url,
                                        {},
                                        { preserveState: true },
                                    )
                                }
                            >
                                <ChevronLeft className="mr-1 size-4" />
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {hyperlinks.current_page} of{' '}
                                {hyperlinks.last_page}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!hyperlinks.next_page_url}
                                onClick={() =>
                                    hyperlinks.next_page_url &&
                                    router.get(
                                        hyperlinks.next_page_url,
                                        {},
                                        { preserveState: true },
                                    )
                                }
                            >
                                Next
                                <ChevronRight className="ml-1 size-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </PublicLayout>
    );
}
