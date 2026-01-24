
import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import HyperlinkForm from '@/components/forms/hyperlink-form';
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
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <HyperlinkForm />
                </div>
            </div>
        </AppLayout>
    );
}
