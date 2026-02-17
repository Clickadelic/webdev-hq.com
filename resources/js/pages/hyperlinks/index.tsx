import { Head } from '@inertiajs/react';
import { router } from "@inertiajs/react";

import AppLayout from '@/layouts/app-layout';
import HyperlinkForm from '@/components/forms/hyperlink-form';

import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hyperlinks',
        href: '/hyperlinks',
    },
];

export default function Hyperlinks() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hyperlinks" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                        <HyperlinkForm className="border bg-white dark:bg-neutral-900 p-4 rounded-xl" onSubmit={(values) => { router.post(Hyperlinks.create(), values, { preserveScroll: true }) }} />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h1>Bla</h1>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h1>Bla</h1>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <h1>Bla</h1>
                </div>
            </div>
        </AppLayout>
    );
}
