import AppLayout from '@/layouts/dashboard-layout';

import { dashboard, index } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Admin',
        href: index().url,
    },
];

export default function DashboardAdminIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-2 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Admin dashboard</h1>
            </div>
        </AppLayout>
    );
}
