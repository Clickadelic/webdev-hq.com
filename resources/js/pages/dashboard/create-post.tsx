'use client';
import AppLayout from '@/layouts/app-layout';

import PostForm from '@/components/forms/post-form';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
type AppItem = { id: string; title: string; url: string; icon: string };

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function DashboardIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <PostForm />
        </AppLayout>
    );
}
