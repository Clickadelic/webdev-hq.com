'use client';

import { index } from '@/actions/App/Http/Controllers/HyperlinkController';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import DeleteHyperlinkButton from '@/components/hyperlinks/delete-hyperlink-button';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Hyperlink, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hyperlinks',
        href: index.url(),
    },
];

export default function Hyperlinks() {
    const { hyperlinks } = usePage<{ hyperlinks: { data: Hyperlink[] } }>()
        .props;
    const items = hyperlinks.data;

    const [editingHyperlink, setEditingHyperlink] = useState<Hyperlink | undefined>(undefined);
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-8 p-4">
                <h2 className="mb-4 text-lg font-medium">Deine Ressourcen</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {items && items.length > 0 ? (
                        items.map((link: Hyperlink) => (
                            <div
                                key={link.id}
                                className="flex flex-col gap-2 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900"
                            >
                                <div className="flex items-start justify-between">
                                    <h3 className="truncate pr-2 text-lg leading-tight font-semibold">
                                        {link.title}
                                    </h3>
                                    <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary uppercase">
                                        {link.status}
                                    </span>
                                </div>

                                {link.category && (
                                    <span className="w-fit rounded-md border border-muted bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                                        {link.category.name}
                                    </span>
                                )}

                                <p className="line-clamp-2 flex-1 font-mono text-sm text-muted-foreground italic">
                                    {link.description || 'Keine Beschreibung.'}
                                </p>

                                {link.tags && link.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
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

                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 truncate text-sm font-medium text-primary underline-offset-4 hover:underline"
                                >
                                    {link.url.replace(/^https?:\/\//, '')}
                                </a>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setEditingHyperlink(link);
                                            setIsEditOpen(true);
                                        }}
                                    >
                                        <Pencil className="mr-1 size-3" />
                                        Edit
                                    </Button>
                                    <DeleteHyperlinkButton id={link.id} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground italic">
                            Noch keine Links vorhanden.
                        </p>
                    )}
                </div>

                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (!open) setEditingHyperlink(undefined);
                }}>
                    <DialogContent className="max-h-[90vh] overflow-y-auto rounded">
                        <DialogHeader>
                            <DialogTitle>Edit Hyperlink</DialogTitle>
                            <DialogDescription>Update the hyperlink details.</DialogDescription>
                        </DialogHeader>
                        <HyperlinkForm
                            hyperlink={editingHyperlink}
                            className="w-full"
                            onSuccess={() => setIsEditOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
