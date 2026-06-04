'use client';

import { destroy, index } from '@/actions/App/Http/Controllers/TagController';
import TagForm from '@/components/forms/tag-form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Tag, type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tags',
        href: index.url(),
    },
];

export default function Tags() {
    const { tags } = usePage<{ tags: { data: Tag[] } }>().props;
    const items = tags.data;

    const [editingTag, setEditingTag] = useState<Tag | undefined>(undefined);
    const [isEditOpen, setIsEditOpen] = useState(false);

    function handleDelete(id: number) {
        router.delete(destroy.url(id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Tag deleted!'),
            onError: () => toast.error('Failed to delete tag.'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-3 p-4">
                {/* Add Tag Form */}
                <div className="max-w-96">
                    <h2 className="mb-4 text-lg font-medium">Add a Tag</h2>
                    <TagForm className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900" />
                </div>

                <hr className="border-sidebar-border" />

                {/* Tag List */}
                <div className="w-full">
                    <h2 className="mb-4 text-lg font-medium">Tags</h2>
                    <div className="flex flex-row flex-wrap gap-5">
                        {items && items.length > 0 ? (
                            items.map((tag: Tag) => (
                                <div
                                    key={tag.id}
                                    className="flex w-96 flex-col gap-3 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900"
                                >
                                    <h3 className="w-full truncate pr-2 text-lg leading-tight font-semibold">
                                        {tag.name}
                                    </h3>

                                    <div className="flex gap-2">
                                        <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary lowercase">
                                            {tag.slug}
                                        </span>
                                        {tag.hyperlinks_count !== undefined && (
                                            <span className="rounded-md border border-muted bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground">
                                                {tag.hyperlinks_count} hyperlink
                                                {tag.hyperlinks_count !== 1
                                                    ? 's'
                                                    : ''}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex w-full flex-row items-center justify-between">
                                        {/* Edit Button */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setEditingTag(tag);
                                                setIsEditOpen(true);
                                            }}
                                        >
                                            <Pencil className="mr-1 size-3" />
                                            Edit
                                        </Button>

                                        {/* Delete Button */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                >
                                                    <Trash2 className="mr-1 size-3" />
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-106.25">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Delete Tag
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to
                                                        delete &quot;{tag.name}
                                                        &quot;? It will be
                                                        removed from all
                                                        hyperlinks.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    tag.id,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground italic">
                                No tags yet. Add your first tag using the form
                                above!
                            </p>
                        )}
                    </div>
                </div>

                {/* Edit Dialog */}
                <Dialog
                    open={isEditOpen}
                    onOpenChange={(open) => {
                        setIsEditOpen(open);
                        if (!open) setEditingTag(undefined);
                    }}
                >
                    <DialogContent className="rounded">
                        <DialogHeader>
                            <DialogTitle>Edit Tag</DialogTitle>
                            <DialogDescription>
                                Update the tag name.
                            </DialogDescription>
                        </DialogHeader>
                        <TagForm
                            tag={editingTag}
                            className="w-full"
                            onSuccess={() => setIsEditOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
