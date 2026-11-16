import PublicLayout from '@/layouts/public-layout';

// imports
import { destroy } from '@/actions/App/Http/Controllers/HyperlinkController';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import HyperlinkCard from '@/components/hyperlinks/hyperlink-card';
import SearchDropdown from '@/components/hyperlinks/search-dropdown';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { type Hyperlink } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

// PaginatedHyperlinks interface defines the structure of the paginated hyperlinks data.
interface PaginatedHyperlinks {
    data: Hyperlink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

// Home component, displays the list of hyperlinks for the public
export default function Home({ hyperlinks, canRegister = true, search: initialSearch = '' }: { hyperlinks: PaginatedHyperlinks; canRegister?: boolean; search?: string }) {
    const count = hyperlinks.total;
    const items = hyperlinks.data;
    const [editingHyperlink, setEditingHyperlink] = useState<Hyperlink | undefined>(undefined);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const isAuthenticated = !!usePage().props.auth?.user;

    // Debounced server search (only when user confirms search)
    const debounceTimer = useRef<number | null>(null);
    const performSearch = useCallback((value: string) => {
        if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
        debounceTimer.current = window.setTimeout(() => {
            router.get('/hyperlinks', value ? { search: value } : {}, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300);
    }, []);

    // Clean up timer on unmount
    useEffect(
        () => () => {
            if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
        },
        [],
    );

    const handleEdit = (hyperlink: Hyperlink) => {
        setEditingHyperlink(hyperlink);
        setIsEditOpen(true);
    };

    const handleDelete = (id: string) => {
        router.delete(destroy.url(id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Hyperlink deleted!'),
            onError: () => toast.error('Failed to delete hyperlink.'),
        });
    };

    return (
        <PublicLayout canRegister={canRegister} title="Hyperlinks">
            {/* Search Dropdown */}
            <div className="relative mx-auto mt-8 w-full max-w-2xl">
                <SearchDropdown className="absolute z-30 w-full" hyperlinks={items} onSearch={performSearch} initialSearch={initialSearch} />
            </div>

            {/* Results */}
            {items.length === 0 ? (
                <p className="my-16 text-center text-muted-foreground">No resources available yet.</p>
            ) : (
                <div className="relative top-28 z-20 pb-12">
                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 lg:grid-cols-5 lg:gap-5">
                        {items.map((link) => (
                            <HyperlinkCard key={link.id} hyperlink={link} onEdit={isAuthenticated ? handleEdit : undefined} onDelete={isAuthenticated ? handleDelete : undefined} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {hyperlinks.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!hyperlinks.prev_page_url}
                                onClick={() => hyperlinks.prev_page_url && router.get(hyperlinks.prev_page_url, {}, { preserveState: true })}
                            >
                                <ChevronLeft className="mr-1 size-4" />
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {hyperlinks.current_page} of {hyperlinks.last_page}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!hyperlinks.next_page_url}
                                onClick={() => hyperlinks.next_page_url && router.get(hyperlinks.next_page_url, {}, { preserveState: true })}
                            >
                                Next
                                <ChevronRight className="ml-1 size-4" />
                            </Button>
                        </div>
                    )}
                    <h3 className="mt-8 text-center text-muted-foreground">Currently tracking {count === 1 ? '1 resource' : `${count} resources`}.</h3>
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
                            <DialogDescription>Update the hyperlink details.</DialogDescription>
                        </DialogHeader>
                        <HyperlinkForm hyperlink={editingHyperlink} className="w-full" onSuccess={() => setIsEditOpen(false)} />
                    </DialogContent>
                </Dialog>
            )}
        </PublicLayout>
    );
}
