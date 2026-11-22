import PublicLayout from '@/layouts/public-layout';

// imports
import { destroy } from '@/actions/App/Http/Controllers/HyperlinkController';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import HyperlinkCard from '@/components/hyperlinks/hyperlink-card';
import SearchDropdown from '@/components/hyperlinks/search-dropdown';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TablePagination from '@/components/ui/table-pagination';
import { type Hyperlink, type Paginator } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
export default function HyperlinksIndex({ hyperlinks, canRegister = true, search: initialSearch = '' }: { hyperlinks: Paginator<Hyperlink>; canRegister?: boolean; search?: string }) {
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
        <PublicLayout canRegister={canRegister} title="Hyperlinks" showGradient>
			
            {/* Search Dropdown */}
            <div className="relative mx-auto mt-8 mb-40 w-full max-w-2xl">
                <SearchDropdown className="absolute z-30 w-full" onSearch={performSearch} initialSearch={initialSearch} />
            </div>

            {/* Results */}
            {items.length === 0 ? (
                <p className="my-16 text-center text-muted-foreground">No resources available yet.</p>
            ) : (
                <div className="relative z-20 pb-12">
                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 lg:grid-cols-5 lg:gap-5">
                        {items.map((link) => (
                            <HyperlinkCard key={link.id} hyperlink={link} onEdit={isAuthenticated ? handleEdit : undefined} onDelete={isAuthenticated ? handleDelete : undefined} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <TablePagination paginator={hyperlinks} className="mt-8 flex-wrap gap-3" preserveScroll={false} />
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
