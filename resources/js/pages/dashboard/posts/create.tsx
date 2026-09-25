'use client';
import AppLayout from '@/layouts/app-layout';

import { index } from '@/actions/App/Http/Controllers/PostController';
import PostForm from '@/components/forms/post-form';
import { type BreadcrumbItem, type Category, type Tag } from '@/types';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: index.url(),
    },
];

export default function DashboardIndex() {
    const { categories, tags } = usePage<{
        categories: Category[];
        tags: Tag[];
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <h1 className="mb-6 text-xl font-semibold">New post</h1>
                <PostForm categories={categories} tags={tags} />
            </div>
        </AppLayout>
    );
}
