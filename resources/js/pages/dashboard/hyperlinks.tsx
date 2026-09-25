'use client';

import { index } from '@/actions/App/Http/Controllers/HyperlinkController';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import HyperlinkTable from '@/components/hyperlinks/hyperlink-table/index';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Hyperlink, type BreadcrumbItem, type Paginator } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hyperlinks',
        href: index.url(),
    },
];

export default function Hyperlinks() {
    const { hyperlinks } = usePage<{ hyperlinks: Paginator<Hyperlink> }>()
        .props;

    const [editingHyperlink, setEditingHyperlink] = useState<
        Hyperlink | undefined
    >(undefined);
    const [isEditOpen, setIsEditOpen] = useState(false);

    function handleEdit(hyperlink: Hyperlink) {
        setEditingHyperlink(hyperlink);
        setIsEditOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-3 p-4">
                <h2 className="mb-4 text-lg font-medium">Deine Ressourcen</h2>
                <HyperlinkTable onEdit={handleEdit} />

                {/* Edit Dialog */}
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
            </div>
        </AppLayout>
    );
}
