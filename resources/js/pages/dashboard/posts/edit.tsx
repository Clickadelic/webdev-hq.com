'use client';

import { edit, index } from '@/actions/App/Http/Controllers/PostController';
import PostForm from '@/components/forms/post-form';
import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type Category,
    type Post,
    type Tag,
} from '@/types';
import { usePage } from '@inertiajs/react';

export default function DashboardPostsEdit() {
    const { post, categories, tags } = usePage<{
        post: Post;
        categories: Category[];
        tags: Tag[];
    }>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Posts', href: index.url() },
        { title: post.title, href: edit.url(post.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <h1 className="mb-6 text-xl font-semibold">Edit post</h1>
                <PostForm post={post} categories={categories} tags={tags} />
            </div>
        </AppLayout>
    );
}
