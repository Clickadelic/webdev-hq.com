import DashboardLayout from '@/layouts/app-layout/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

import CircularMenu from '@/components/circular-menu';
import { Toaster } from '@/components/ui/sonner';

interface DashboardLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: DashboardLayoutProps) => (
    <DashboardLayout breadcrumbs={breadcrumbs} {...props}>
        <Head title={breadcrumbs?.[breadcrumbs.length - 1]?.title} />
        <div className="p-4">
			{children}
		</div>
        <Toaster />
        <CircularMenu />
    </DashboardLayout>
);
