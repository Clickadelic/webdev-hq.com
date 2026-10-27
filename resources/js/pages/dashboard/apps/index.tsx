'use client';

import AppForm from '@/components/forms/app-form';

import { index } from '@/actions/App/Http/Controllers/DashboardController';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/dashboard-layout';
import { App, type BreadcrumbItem, type Paginator } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: index.url(),
    },
    {
        title: 'Apps',
        href: '#',
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
                <h2 className="mb-4 text-lg font-medium">Your hyperlinks</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {items && items.length > 0 ? (
                        items.map((app: App) => (
                            <div key={app.id} className="flex flex-col gap-2 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900">
                                <div className="flex items-start justify-between">
                                    <h3 className="truncate pr-2 text-lg leading-tight font-semibold">{app.title}</h3>
                                </div>

                                <a href={app.url} target="_blank" rel="noopener noreferrer" className="mt-2 truncate text-sm font-medium text-primary underline-offset-4 hover:underline">
                                    {app.url.replace(/^https?:\/\//, '')}
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground italic">No hyperlinks yet.</p>
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
                            <DialogDescription>Update the hyperlink details.</DialogDescription>
                        </DialogHeader>
                        <AppForm app={editingApp} className="w-full" />
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
