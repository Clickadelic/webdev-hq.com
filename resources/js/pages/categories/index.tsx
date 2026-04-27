'use client';

import { index } from '@/actions/App/Http/Controllers/HyperlinkController';
import CategoryForm from '@/components/forms/category-form';
import AppLayout from '@/layouts/app-layout';
import { Category, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

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

    console.log('Categories are', items);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-8 p-4">
                {/* Sektion 1: Das Formular (oben oder in der Sidebar) */}
                <div className="max-w-2xl">
                    <h2 className="mb-4 text-lg font-medium">
                        Add a Category{' '}
                    </h2>
                    <CategoryForm className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900" />
                </div>

                <hr className="border-sidebar-border" />

                {/* Sektion 2: Die Liste der Items */}
                <div>
                    <h2 className="mb-4 text-lg font-medium">Categories</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items && items.length > 0 ? (
                            items.map((link: Category) => (
                                <div
                                    key={link.id}
                                    className="flex flex-col gap-2 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900"
                                >
                                    <div className="flex items-start justify-between">
                                        <h3 className="truncate pr-2 text-lg leading-tight font-semibold">
                                            {link.name}
                                        </h3>
                                        <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary uppercase">
                                            {link.slug}
                                        </span>
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
            </div>
        </AppLayout>
    );
}
