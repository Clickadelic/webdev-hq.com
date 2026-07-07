'use client';

import { index } from '@/actions/App/Http/Controllers/AppController';
import AppForm from '@/components/forms/app-form';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { App, type BreadcrumbItem, type Paginator } from '@/types';
import { usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Apps',
        href: index.url(),
    },
];

export default function Apps() {
    const { apps } = usePage<{ apps: Paginator<App> }>().props;
    const items = apps.data;

    const [editingApp, setEditingApp] = useState<App | undefined>(undefined);
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-3 p-4">
                <h2 className="mb-4 text-lg font-medium">Deine Ressourcen</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {items && items.length > 0 ? (
                        items.map((app: App) => (
                            <div
                                key={app.id}
                                className="flex flex-col gap-2 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900"
                            >
                                <div className="flex items-start justify-between">
                                    <h3 className="truncate pr-2 text-lg leading-tight font-semibold">
                                        {app.title}
                                    </h3>
                                </div>

                                <a
                                    href={app.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 truncate text-sm font-medium text-primary underline-offset-4 hover:underline"
                                >
                                    {app.url.replace(/^https?:\/\//, '')}
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
                            No hyperlinks yet.
                        </p>
                    )}
                </div>

                {/* Edit Dialog */}
                <Dialog
                    open={isEditOpen}
                    onOpenChange={(open) => {
                        setIsEditOpen(open);
                        if (!open) setEditingApp(undefined);
                    }}
                >
                    <DialogContent className="max-h-[90vh] overflow-y-auto rounded">
                        <DialogHeader>
                            <DialogTitle>Edit App</DialogTitle>
                            <DialogDescription>
                                Update the hyperlink details.
                            </DialogDescription>
                        </DialogHeader>
                        <AppForm app={editingApp} className="w-full" />
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
