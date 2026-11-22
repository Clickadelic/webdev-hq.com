import CircularMenu from '@/components/circular-menu';
import FloatingGradient from '@/components/floating-gradient';
import CookieNotice from '@/layouts/public-layout/cookie-notice';
import PublicBreadcrumbs from '@/layouts/public-layout/public-breadcrumbs';
import PublicFooter from '@/layouts/public-layout/public-footer';
import PublicHeader from '@/layouts/public-layout/public-header';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';

// Public Layout Interface
export interface PostsLayoutProps {
    title?: string;
    showTitle?: boolean;
    leftSidebar?: React.ReactNode | null;
    rightSidebar?: React.ReactNode | null;
    children: React.ReactNode;
    canRegister?: boolean;
    wrapperClasses?: string;
    contentClasses?: string;
    showGradient?: boolean;
    isInteractive?: boolean;
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
 * @param {boolean} showTitle - Indicates if the title should be displayed
 * @param {boolean} canRegister - Indicates if the registration option should be displayed
 * @param {string} contentClasses - An optional class name to apply to the main container
 * @param {string} wrapperClasses - An optional class name to apply to the wrapper container
 * @param {boolean} showGradient - Indicates if the floating gradient should be displayed
 * @param {boolean} isInteractive - Indicates if the floating gradient should be interactive
 * @returns {React.ReactNode} - The rendered public layout component
 */
export default function PostsLayout({
    title,
    // showTitle,
    // leftSidebar,
    // rightSidebar,
    children,
    canRegister,
    wrapperClasses,
    // contentClasses,
    showGradient = true,
    isInteractive = false,
}: PostsLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className={cn('flex min-h-svh flex-col items-center justify-start', showGradient && 'relative isolate')}>
                {showGradient && <FloatingGradient isInteractive={isInteractive} />}
                <PublicHeader canRegister={canRegister} />
                <PublicBreadcrumbs />
                {/* {leftSidebar && !rightSidebar && (
                    <div className={cn('container mx-auto mb-3 grid grow grid-cols-1 gap-3 md:grid-cols-6', wrapperClasses)}>
                        <aside className="col-span-1 hidden w-full md:flex">
                            <div className="w-full rounded-lg bg-white/30 p-1 dark:bg-neutral-900/30">
                                <div className="h-full rounded-lg bg-white p-4 dark:bg-neutral-900">{leftSidebar}</div>
                            </div>
                        </aside>
                        <main className={cn('col-span-5 w-full', contentClasses)}>
                            <div className="rounded-lg bg-white/30 p-1 dark:bg-neutral-900/30">
                                <div className="rounded-lg bg-white p-4 dark:bg-neutral-900">
                                    {showTitle && <PublicTitle title={title} />}
                                    {children}
                                </div>
                            </div>
                        </main>
                    </div>
                )}
                {leftSidebar && rightSidebar && (
                    <div className={cn('container mx-auto grid grow grid-cols-1 gap-4 md:grid-cols-6', wrapperClasses)}>
                        <aside className="col-span-1 hidden rounded-lg bg-white/30 p-1 md:flex dark:bg-neutral-900/30">
                            <div className="rounded-lg bg-white p-4 dark:bg-neutral-900">{leftSidebar}</div>
                        </aside>
                        <main className={cn('col-span-3 w-full', contentClasses)}>
                            <div className="rounded-lg bg-white/30 p-1 dark:bg-neutral-900/30">
                                <div className="rounded-lg bg-white p-4 dark:bg-neutral-900">
                                    {showTitle && <PublicTitle title={title} />}
                                    {children}
                                </div>
                            </div>
                        </main>
                        <aside className="col-span-1 hidden rounded-lg bg-white/30 p-1 md:flex dark:bg-neutral-900/30">
                            <div className="rounded-lg bg-white p-4 dark:bg-neutral-900">{rightSidebar}</div>
                        </aside>
                    </div>
                )}
                {rightSidebar && !leftSidebar && (
                    <div className={cn('container mx-auto grid grow grid-cols-1 gap-4 md:grid-cols-6', wrapperClasses)}>
                        <main className={cn('col-span-5 w-full', contentClasses)}>
                            {showTitle && <PublicTitle title={title} />}
                            {children}
                        </main>
                        <aside className="col-span-1 hidden rounded-lg bg-white/30 p-1 md:flex dark:bg-neutral-900/30">
                            <div className="rounded-lg bg-white p-4 dark:bg-neutral-900">{rightSidebar}</div>
                        </aside>
                    </div>
                )}
                {!leftSidebar && !rightSidebar && (
                    <div className={cn('container mx-auto flex grow', wrapperClasses)}>
                        <main className={cn('w-full', contentClasses)}>
                            {showTitle && <PublicTitle title={title} />}
                            {children}
                        </main>
                    </div>
                )} */}
                <div className={cn('mx-auto mb-3 flex max-w-md grow rounded-lg bg-white/30 p-1 backdrop-blur dark:bg-neutral-900/30', wrapperClasses)}>
                    <div className="rounded-sm bg-white p-4 dark:bg-neutral-900">{children}</div>
                </div>

                <Toaster />
                <CircularMenu />
                <CookieNotice />
                <PublicFooter />
            </div>
        </>
    );
}
