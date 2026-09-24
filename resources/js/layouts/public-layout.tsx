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
 * @param {React.ReactNode} children - The children of the component
 * @returns {React.ReactNode} - The wrapped children
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
            <div className="flex min-h-svh flex-col items-center justify-items-center">
                <PublicHeader canRegister={canRegister} />
                <PublicBreadcrumbs />
                <div
                    className={cn(
                        'container mx-auto flex grow flex-col justify-center rounded bg-white/30 p-2 shadow backdrop-blur sm:mx-0',
                        className,
                    )}
                >
                    <div className="grow rounded bg-white p-4">
                        <div className="flex justify-start gap-6">
                            {sidebar ? sidebar : null}
                            <main className="w-full">{children}</main>
                        </div>
                    </div>
                </div>
                <Toaster />
                <CircularMenu />
                <PublicFooter />
            </div>
        </>
    );
}
