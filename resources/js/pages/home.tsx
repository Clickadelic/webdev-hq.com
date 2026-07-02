'use client';

import { destroy } from '@/actions/App/Http/Controllers/HyperlinkController';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import HyperlinkCard from '@/components/hyperlinks/hyperlink-card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import PublicLayout from '@/layouts/public-layout';
import { type Hyperlink } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
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
    const count = hyperlinks.total;
    const items = hyperlinks.data;
    const [query, setQuery] = useState<string>('');
    const [editingHyperlink, setEditingHyperlink] = useState<
        Hyperlink | undefined
    >(undefined);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const isAuthenticated = !!usePage().props.auth?.user;

    // Debounced live search
    const debounceTimer = useRef<number | null>(null);
    const search = useCallback((value: string) => {
        if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
        debounceTimer.current = window.setTimeout(() => {
            router.get('/', value ? { search: value } : {}, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 200);
    }, []);

    // Clean up timer on unmount
    useEffect(
        () => () => {
            if (debounceTimer.current)
                window.clearTimeout(debounceTimer.current);
        },
        [],
    );

    function handleQueryChange(value: string) {
        setQuery(value);
        search(value);
    }

    const handleEdit = (hyperlink: Hyperlink) => {
        setEditingHyperlink(hyperlink);
        setIsEditOpen(true);
    };

    const handleDelete = (id: number) => {
        router.delete(destroy.url(id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Hyperlink deleted!'),
            onError: () => toast.error('Failed to delete hyperlink.'),
        });
    };

    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            {/* Search */}
            <div className="mx-auto mt-8 w-full max-w-lg">
                <div className="rounded-xl bg-white/30 p-1 shadow-lg backdrop-blur dark:bg-white/5">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="relative rounded-lg bg-white dark:bg-neutral-950"
                    >
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleQueryChange(e.target.value)}
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
                <div className="py-12">
                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 lg:grid-cols-5">
                        {items.map((link) => (
                            <HyperlinkCard
                                key={link.id}
                                hyperlink={link}
                                onEdit={
                                    isAuthenticated ? handleEdit : undefined
                                }
                                onDelete={
                                    isAuthenticated ? handleDelete : undefined
                                }
                            />
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
                    <h3 className="mt-8 text-center text-muted-foreground">
                        Currently tracking{' '}
                        {count === 1 ? '1 resource' : `${count} resources`}.
                    </h3>
                </div>
            )}

            {/* Edit Dialog */}
            {isAuthenticated && (
                <Dialog
                    open={isEditOpen}
                    onOpenChange={(open) => {
                        setIsEditOpen(open);
                        if (!open) setEditingHyperlink(undefined);
                    }}
                >
                    <DialogContent className="max-h-[90vh] overflow-y-auto rounded">
                        <DialogHeader>
                            <DialogTitle>Edit Hyperlink</DialogTitle>
                            <DialogDescription>
                                Update the hyperlink details.
                            </DialogDescription>
                        </DialogHeader>
                        <HyperlinkForm
                            hyperlink={editingHyperlink}
                            className="w-full"
                            onSuccess={() => setIsEditOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </PublicLayout>
    );
}
