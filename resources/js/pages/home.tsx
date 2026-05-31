'use client';

import PublicLayout from '@/layouts/public-layout';
import { type Category, type Hyperlink } from '@/types';
import { ExternalLink, Search, Tag as TagIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Home({
    hyperlinks,
    canRegister = true,
}: {
    hyperlinks: Hyperlink[];
    canRegister?: boolean;
}) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        if (!query.trim()) return hyperlinks;
        const q = query.toLowerCase();
        return hyperlinks.filter(
            (h) =>
                h.title.toLowerCase().includes(q) ||
                h.description?.toLowerCase().includes(q) ||
                h.url.toLowerCase().includes(q) ||
                h.category?.name.toLowerCase().includes(q) ||
                h.tags?.some((t) => t.name.toLowerCase().includes(q)),
        );
    }, [hyperlinks, query]);

    const grouped = useMemo(() => {
        const map = new Map<string, { category: Category | null; items: Hyperlink[] }>();
        for (const h of filtered) {
            const key = h.category?.name ?? '__uncategorized__';
            if (!map.has(key)) {
                map.set(key, { category: h.category ?? null, items: [] });
            }
            map.get(key)!.items.push(h);
        }
        return [...map.values()].sort((a, b) => {
            if (!a.category) return 1;
            if (!b.category) return -1;
            return a.category.name.localeCompare(b.category.name);
        });
    }, [filtered]);

    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            {/* Search */}
            <div className="mx-auto mt-8 mb-10 w-full max-w-lg">
                <div className="rounded-xl bg-white/30 p-1 backdrop-blur dark:bg-white/5">
                    <div className="relative rounded-lg bg-white dark:bg-neutral-950">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search resources…"
                            className="w-full rounded-lg py-2.5 pr-3 pl-9 text-sm placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none dark:bg-neutral-950 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
                <p className="my-16 text-center text-muted-foreground">
                    {query ? 'No results found.' : 'No resources available yet.'}
                </p>
            ) : (
                <div className="space-y-10 pb-12">
                    {grouped.map((group) => (
                        <section key={group.category?.slug ?? 'uncategorized'}>
                            <h2 className="mb-4 border-b border-neutral-300 pb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase dark:border-neutral-700">
                                {group.category?.name ?? 'Uncategorized'}
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {group.items.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col gap-2 rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:bg-neutral-900"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="truncate text-sm font-semibold leading-tight group-hover:text-primary">
                                                {link.title}
                                            </h3>
                                            <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>

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
                        </section>
                    ))}
                </div>
            )}
        </PublicLayout>
    );
}
