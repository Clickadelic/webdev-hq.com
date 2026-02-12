import AppLayout from '@/layouts/app-layout';
import { router } from "@inertiajs/react";
import { Head } from '@inertiajs/react';

import { hyperlinks } from '@/routes/hyperlinks';

import HyperlinkForm from '@/components/forms/hyperlink-form';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hyperlinks',
        href: hyperlinks().url,
    },
];

export default function Hyperlinks() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hyperlinks" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <HyperlinkForm
                        className="border bg-white dark:bg-neutral-900 p-4 rounded-xl"
                        onSubmit={(values) => {
                            router.post(
                                hyperlinks.store().url,
                                values,
                                { preserveScroll: true }
                            );
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
