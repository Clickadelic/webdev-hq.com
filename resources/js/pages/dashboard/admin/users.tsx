import AppLayout from '@/layouts/dashboard-layout';

import { dashboard } from '@/routes';
import { index } from '@/routes/admin';
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
    {
        title: 'Users',
        href: '#',
    },
];

export default function AdminUsersPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-2 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">User dashboard</h1>
            </div>
        </AppLayout>
    );
}
