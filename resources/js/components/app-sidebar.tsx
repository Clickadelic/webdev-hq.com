import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, home } from '@/routes';
import {
    BookOpen,
    GalleryHorizontal,
    Home,
    LayoutGrid,
    Link,
    ScreenShare,
    Webhook,
} from 'lucide-react';

import AppLogo from './app-logo';

import { type NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: home(),
        icon: Home,
    },
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Apps',
        href: '/apps',
        icon: ScreenShare,
    },
    {
        title: 'Hyperlinks',
        href: '/hyperlinks',
        icon: Link,
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: Webhook,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'API Platform',
        href: 'https://api.webdev-hq.com',
        icon: GalleryHorizontal,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
