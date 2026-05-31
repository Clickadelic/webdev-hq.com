import CircularMenu from '@/components/circular-menu';
import PublicBreadcrumbs from '@/components/public-breadcrumbs';
import PublicFooter from '@/components/public-footer';
import PublicHeader from '@/components/public-header';

import { Toaster } from '@/components/ui/sonner';
import { Head } from '@inertiajs/react';

interface PublicSidebarLeftLayoutProps {
    title?: string;
    children: React.ReactNode;
    canRegister?: boolean;
}

/**
 * A public layout component that wraps its children in a
 * div with a class of "flex flex-col min-h-dvh justify-between items-center"
 *
 * @param {React.ReactNode} children - The children of the component
 * @returns {React.ReactNode} - The wrapped children
 */
export default function PublicSidebarLeftLayout({
    title,
    children,
    canRegister,
}: PublicSidebarLeftLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="grid min-h-svh grid-rows-[auto_auto_1fr_auto] justify-items-center">
                <PublicHeader canRegister={canRegister} />
                <PublicBreadcrumbs className="mb-3 border-b border-neutral-300" />
                <main className="container mx-auto">
                    <aside>Sidebar</aside>
                    <article>{children}</article>
                </main>
                <Toaster />
                <CircularMenu />
                <PublicFooter />
            </div>
        </>
    );
}
