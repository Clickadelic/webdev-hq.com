import CircularMenu from '@/components/circular-menu';
import { Toaster } from '@/components/ui/sonner';
import CookieNotice from '@/layouts/public-layout/cookie-notice';
import PublicBreadcrumbs from '@/layouts/public-layout/public-breadcrumbs';
import PublicFooter from '@/layouts/public-layout/public-footer';
import PublicHeader from '@/layouts/public-layout/public-header';
import PublicTitle from '@/layouts/public-layout/public-title';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';

// Public Layout Interface
interface PublicLayoutProps {
    title?: string;
    leftSidebar?: React.ReactNode | null;
    rightSidebar?: React.ReactNode | null;
    children: React.ReactNode;
    canRegister?: boolean;
    wrapperClasses?: string;
    contentClasses?: string;
}

/**
 * A public layout component that wraps its children in a
 * div with a class of "flex flex-col min-h-dvh justify-between items-center"
 *
 * @param {string} title - The title of the page
 * @param {React.ReactNode} leftSidebar - The left sidebar component
 * @param {React.ReactNode} rightSidebar - The right sidebar component
 * @param {React.ReactNode} children - The main content of the page
 * @param {boolean} canRegister - Indicates if the registration option should be displayed
 * @param {string} contentClasses - An optional class name to apply to the main container
 */
export default function PublicLayout({
    title,
    leftSidebar,
    rightSidebar,
    children,
    canRegister,
    wrapperClasses,
    contentClasses,
}: PublicLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-svh flex-col items-center justify-start">
                <PublicHeader canRegister={canRegister} />
                <PublicBreadcrumbs />
                {leftSidebar && !rightSidebar && (
                    <div
                        className={cn(
                            'container mx-auto grid grow grid-cols-1 gap-4 px-3 md:grid-cols-6 md:px-0',
                            wrapperClasses,
                        )}
                    >
                        <aside className="col-span-1 hidden md:flex">{leftSidebar}</aside>
                        <main className={cn('col-span-5 w-full', contentClasses)}>
                            <PublicTitle title={title} />
                            {children}
                        </main>
                    </div>
                )}
                {leftSidebar && rightSidebar && (
                    <div
                        className={cn(
                            'container mx-auto grid grow grid-cols-1 gap-4 md:grid-cols-6',
                            wrapperClasses,
                        )}
                    >
                        <aside className="col-span-1">{leftSidebar}</aside>
                        <main className={cn('col-span-4 w-full', contentClasses)}>
                            <PublicTitle title={title} />
                            {children}
                        </main>
                        <aside className="col-span-1">{rightSidebar}</aside>
                    </div>
                )}
                {rightSidebar && !leftSidebar && (
                    <div
                        className={cn(
                            'container mx-auto grid grow grid-cols-1 gap-4 md:grid-cols-6',
                            wrapperClasses,
                        )}
                    >
                        <main className={cn('col-span-5 w-full', contentClasses)}>
                            <PublicTitle title={title} />
                            {children}
                        </main>
                        <aside className="col-span-1">{rightSidebar}</aside>
                    </div>
                )}
                {!leftSidebar && !rightSidebar && (
                    <div className={cn('container mx-auto flex grow', wrapperClasses)}>
                        <main className={cn('w-full px-3', contentClasses)}>
                            <PublicTitle title={title} />
                            {children}
                        </main>
                    </div>
                )}
                <Toaster />
                <CircularMenu />
                <CookieNotice />
                <PublicFooter />
            </div>
        </>
    );
}
