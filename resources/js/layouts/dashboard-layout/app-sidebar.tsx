import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavFooter } from '@/layouts/dashboard-layout/nav-footer';
import { NavMain } from '@/layouts/dashboard-layout/nav-main';
import { NavUser } from '@/layouts/dashboard-layout/nav-user';
import { GalleryHorizontal, LayoutGrid, Link, Pencil, Tag, Webhook } from 'lucide-react';

import { index as postsIndex } from '@/actions/App/Http/Controllers/PostController';
import AppLogo from './app-logo';

import { type NavGroup, type NavItem } from '@/types';

const mainNavGroups: NavGroup[] = [
    {
        title: 'Personal',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Content',
        items: [
            {
                title: 'Posts',
                href: postsIndex.url(),
                icon: Pencil,
            },
            {
                title: 'Hyperlinks',
                href: '/dashboard/hyperlinks',
                icon: Link,
            },
            {
                title: 'Categories',
                href: '/dashboard/categories',
                icon: Webhook,
            },
            {
                title: 'Tags',
                href: '/dashboard/tags',
                icon: Tag,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'API Platform',
        href: 'https://webdev-hq.com',
        icon: GalleryHorizontal,
    },
];

/**
 * A component that renders the application's sidebar, including the main navigation, footer navigation, and user section.
 *
 * @returns {React.ReactNode} - The rendered application sidebar
 */
export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <AppLogo logoClassName="size-7" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={mainNavGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
