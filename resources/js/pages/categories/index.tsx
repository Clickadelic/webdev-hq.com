'use client';

import {
    destroy,
    index,
} from '@/actions/App/Http/Controllers/CategoryController';
import CategoryForm from '@/components/forms/category-form';
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
import { Category, type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: index.url(),
    },
];

export default function Categories() {
    const { categories } = usePage<{ categories: { data: Category[] } }>()
        .props;
    const items = categories.data;

    const [editingCategory, setEditingCategory] = useState<
        Category | undefined
    >(undefined);
    const [isEditOpen, setIsEditOpen] = useState(false);

    function handleDelete(id: number) {
        router.delete(destroy.url(id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Category deleted!'),
            onError: () => toast.error('Failed to delete category.'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-3 p-4">
                {/* Add Category Form */}
                <div className="max-w-96">
                    <h2 className="mb-4 text-lg font-medium">Add a Category</h2>
                    <CategoryForm className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900" />
                </div>

                <hr className="border-sidebar-border" />

                {/* Category List */}
                <div className="w-full">
                    <h2 className="mb-4 text-lg font-medium">Categories</h2>
                    <div className="flex flex-row flex-wrap gap-5">
                        {items && items.length > 0 ? (
                            items.map((cat: Category) => (
                                <div
                                    key={cat.id}
                                    className="flex w-96 flex-col gap-3 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900"
                                >
                                    <h3 className="w-full truncate pr-2 text-lg leading-tight font-semibold">
                                        {cat.name}
                                    </h3>

                                    <div className="flex gap-2">
                                        <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary lowercase">
                                            {cat.slug}
                                        </span>
                                        {cat.hyperlinks_count !== undefined && (
                                            <span className="rounded-md border border-muted bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground">
                                                {cat.hyperlinks_count} hyperlink
                                                {cat.hyperlinks_count !== 1
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
                                                setEditingCategory(cat);
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
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Delete Category
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to
                                                        delete &quot;{cat.name}
                                                        &quot;? Hyperlinks in
                                                        this category will
                                                        become uncategorized.
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
                                                                    cat.id,
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
                                No categories yet. Add your first category using
                                the form above!
                            </p>
                        )}
                    </div>
                </div>

                {/* Edit Dialog */}
                <Dialog
                    open={isEditOpen}
                    onOpenChange={(open) => {
                        setIsEditOpen(open);
                        if (!open) setEditingCategory(undefined);
                    }}
                >
                    <DialogContent className="rounded">
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>
                                Update the category details.
                            </DialogDescription>
                        </DialogHeader>
                        <CategoryForm
                            category={editingCategory}
                            className="w-full"
                            onSuccess={() => setIsEditOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
