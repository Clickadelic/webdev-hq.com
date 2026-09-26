import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavGroup, type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

function hasActiveItem(item: NavItem, currentUrl: string): boolean {
    return Boolean(
        (item.href && currentUrl.startsWith(resolveUrl(item.href))) ||
        item.items?.some((child) => hasActiveItem(child, currentUrl)),
    );
}

function NavMenuItem({
    item,
    currentUrl,
    nested = false,
}: {
    item: NavItem;
    currentUrl: string;
    nested?: boolean;
}) {
    const hasChildren = Boolean(item.items?.length);
    const isActive = Boolean(item.href && currentUrl.startsWith(resolveUrl(item.href)));
    const MenuItem = nested ? SidebarMenuSubItem : SidebarMenuItem;
    const MenuButton = nested ? SidebarMenuSubButton : SidebarMenuButton;

    if (!hasChildren) {
        return (
            <MenuItem>
                <MenuButton
                    asChild
                    isActive={isActive}
                    {...(!nested && { tooltip: { children: item.title } })}
                >
                    <a href={item.href ? resolveUrl(item.href) : undefined}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </a>
                </MenuButton>
            </MenuItem>
        );
    }

    return (
        <Collapsible asChild defaultOpen={hasActiveItem(item, currentUrl)}>
            <MenuItem>
                <CollapsibleTrigger asChild>
                    <MenuButton
                        isActive={isActive}
                        tooltip={!nested ? { children: item.title } : undefined}
                    >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/menu-item:rotate-90" />
                    </MenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items?.map((child) => (
                            <NavMenuItem
                                key={child.title}
                                item={child}
                                currentUrl={currentUrl}
                                nested
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </MenuItem>
        </Collapsible>
    );
}

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const page = usePage();
    return (
        <>
            {groups.map((group) => (
                <SidebarGroup key={group.title} className="px-2 py-0">
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <NavMenuItem key={item.title} item={item} currentUrl={page.url} />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
