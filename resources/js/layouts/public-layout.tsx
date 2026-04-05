import { Head } from '@inertiajs/react';

import PublicBreadcrumbs from '@/components/public-breadcrumbs';
import PublicFooter from '@/components/public-footer';
import PublicHeader from '@/components/public-header';
import { Toaster } from '@/components/ui/sonner';

interface PublicLayoutProps {
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
export default function PublicLayout({
    title,
    children,
    canRegister,
}: PublicLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
                <PublicHeader canRegister={canRegister} />
                <PublicBreadcrumbs />
                <main className="container mx-auto py-12">
                    <h2 className="mb-3 text-2xl font-medium">{title}</h2>
                    {children}
                </main>
                <Toaster />
                <PublicFooter />
            </div>
        </>
    );
}
