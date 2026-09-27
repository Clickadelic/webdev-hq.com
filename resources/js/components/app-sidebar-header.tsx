import { Breadcrumbs } from '@/components/breadcrumbs';
import { FullscreenButton } from '@/components/fullscreen-button';
import { LangSwitch } from '@/components/lang-switch';
import { NotificationButton } from '@/components/notification-button';
import { SidebarSheet } from '@/components/sidebar-sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UserDropdownMenu from '@/components/user-dropdown-menu';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
/**
 * A component that renders the header for the sidebar, including the sidebar trigger and breadcrumbs.
 *
 * @param {{ breadcrumbs?: BreadcrumbItemType[] }} props - The props for the component
 * @returns {React.ReactNode} - The rendered sidebar header
 */
export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center justify-between gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <nav className="flex w-full items-center justify-end">
                <ul className="flex items-center justify-end gap-2">
                    <li>
                        <FullscreenButton />
                    </li>
                    <li>
                        <LangSwitch />
                    </li>
                    <li>
                        <NotificationButton />
                    </li>
                    <li>
                        <SidebarSheet />
                    </li>
                    <li>
                        <UserDropdownMenu user={auth.user} />
                    </li>
                </ul>
            </nav>
        </header>
    );
}
