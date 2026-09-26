import AmbientBlobs from '@/components/ambient-blobs';
import CircularMenu from '@/components/circular-menu';
import PublicBreadcrumbs from '@/components/public-breadcrumbs';
import PublicFooter from '@/components/public-footer';
import PublicHeader from '@/components/public-header';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';

interface PublicLayoutProps {
    title?: string;
    sidebar?: React.ReactNode | null;
    children: React.ReactNode;
    canRegister?: boolean;
    className?: string;
}

/**
 * A public layout component that wraps its children in a
 * div with a class of "flex flex-col min-h-dvh justify-between items-center"
 *
 * @param {React.ReactNode} title - The title of the page
 * @param {React.ReactNode} sidebar - The sidebar component
 * @param {React.ReactNode} children - The main content of the page
 * @param {boolean} canRegister - Indicates if the registration option should be displayed
 * @param {string} className - An optional class name to apply to the main container
 */
export default function PublicLayout({
    title,
    sidebar,
    children,
    canRegister,
    className,
}: PublicLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-svh flex-col items-center justify-start">
                <AmbientBlobs />
                <PublicHeader canRegister={canRegister} />
                <PublicBreadcrumbs />
                <main
                    className={cn(
                        'container mx-auto flex grow flex-col items-start justify-start',
                        className,
                    )}
                >
                    {children}
                </main>
                <Toaster />
                <CircularMenu />
                <PublicFooter />
            </div>
        </>
    );
}
