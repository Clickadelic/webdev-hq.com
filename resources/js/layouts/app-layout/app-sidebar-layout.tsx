import { AppContent } from '@/layouts/dashboard-layout/app-content';
import { AppShell } from '@/layouts/dashboard-layout/app-shell';
import { AppSidebar } from '@/layouts/dashboard-layout/app-sidebar';
import { AppSidebarHeader } from '@/layouts/dashboard-layout/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
