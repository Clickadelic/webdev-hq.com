import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

import CircularMenu from '@/components/circular-menu';
import { Toaster } from '@/components/ui/sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Head title={breadcrumbs?.[breadcrumbs.length - 1]?.title} />
        {children}
        <Toaster />
        <CircularMenu />
    </AppLayoutTemplate>
);
