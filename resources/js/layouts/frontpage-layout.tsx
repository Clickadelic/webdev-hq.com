import { Head } from '@inertiajs/react';

import PublicFooter from '@/components/public-footer';
import PublicHeader from '@/components/public-header';
import { Toaster } from '@/components/ui/sonner';

interface FrontpageLayoutProps {
    title?: string;
    children: React.ReactNode;
    canRegister?: boolean;
}

/**
 * A public layout component for the frontpage, that wraps its children in a
 * div with a class of "flex flex-col min-h-dvh justify-between items-center"
 *
 * @param {React.ReactNode} children - The children of the component
 * @returns {React.ReactNode} - The wrapped children
 */
export default function FrontpageLayout({
    title,
    children,
    canRegister,
}: FrontpageLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen flex-col items-center justify-between">
                <PublicHeader canRegister={canRegister} />
                {children}
                <Toaster />
                <PublicFooter />
            </div>
        </>
    );
}
