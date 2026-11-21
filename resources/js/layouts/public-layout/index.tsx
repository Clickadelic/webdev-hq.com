import PublicHeader from '@/layouts/public-layout/public-header';
import PublicTitle from '@/layouts/public-layout/public-title';
import PublicBreadcrumbs from '@/layouts/public-layout/public-breadcrumbs';
import PublicFooter from '@/layouts/public-layout/public-footer';
import FloatingGradient from '@/components/floating-gradient';
import CircularMenu from '@/components/circular-menu';
import CookieNotice from '@/layouts/public-layout/cookie-notice';

import { Toaster } from '@/components/ui/sonner';
import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';

// Public Layout Interface
export interface PublicLayoutProps {
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
export default function PublicLayout({ title, showTitle, leftSidebar, rightSidebar, children, canRegister, wrapperClasses, contentClasses, showGradient = true, isInteractive = false }: PublicLayoutProps) {
	
	return (
        <>
            <Head title={title} />
            <div className={cn('flex min-h-svh flex-col items-center justify-start', showGradient && 'relative isolate')}>
                {showGradient && (
                    <FloatingGradient isInteractive={isInteractive} />
                )}
                <PublicHeader canRegister={canRegister} />
                <PublicBreadcrumbs />
                {leftSidebar && !rightSidebar && (
                    <div className={cn('container mx-auto grid grow grid-cols-1 gap-3 md:grid-cols-6 mb-3', wrapperClasses)}>
                        <aside className="col-span-1 hidden md:flex w-full">
							<div className="bg-white/30 dark:bg-neutral-900/30 rounded-lg p-1 w-full">
								<div className="bg-white dark:bg-neutral-900 p-4 rounded-lg h-full">
									{leftSidebar}
								</div>
							</div>
						</aside>
                        <main className={cn('col-span-5 w-full', contentClasses)}>
                            <div className="bg-white/30 dark:bg-neutral-900/30 p-1 rounded-lg">
								<div className="bg-white dark:bg-neutral-900 p-4 rounded-lg">
                            		{showTitle && <PublicTitle title={title} />}
									{children}
								</div>
							</div>
                        </main>
                    </div>
                )}
                {leftSidebar && rightSidebar && (
                    <div className={cn('container mx-auto grid grow grid-cols-1 gap-4 md:grid-cols-6', wrapperClasses)}>
                        <aside className="col-span-1 hidden md:flex bg-white/30 dark:bg-neutral-900/30 rounded-lg p-1">
							<div className="bg-white dark:bg-neutral-900 p-4 rounded-lg">
								{leftSidebar}
							</div>
						</aside>
                        <main className={cn('col-span-3 w-full', contentClasses)}>
                            <div className="bg-white/30 dark:bg-neutral-900/30 p-1 rounded-lg">
								<div className="bg-white dark:bg-neutral-900 p-4 rounded-lg">
                            		{showTitle && <PublicTitle title={title} />}
									{children}
								</div>
							</div>
                        </main>
                        <aside className="col-span-1 hidden md:flex bg-white/30 dark:bg-neutral-900/30 rounded-lg p-1">
							<div className="bg-white dark:bg-neutral-900 p-4 rounded-lg">
								{rightSidebar}
							</div>
						</aside>
                    </div>
                )}
                {rightSidebar && !leftSidebar && (
                    <div className={cn('container mx-auto grid grow grid-cols-1 gap-4 md:grid-cols-6', wrapperClasses)}>
                        <main className={cn('col-span-5 w-full', contentClasses)}>
                            {showTitle && <PublicTitle title={title} />}
                            {children}
                        </main>
                        <aside className="col-span-1 hidden md:flex bg-white/30 dark:bg-neutral-900/30 rounded-lg p-1">
							<div className="bg-white dark:bg-neutral-900 p-4 rounded-lg">
								{rightSidebar}
							</div>
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
                )}
                <Toaster />
                <CircularMenu />
                <CookieNotice />
                <PublicFooter />
            </div>
        </>
    );
}
