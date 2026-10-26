import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import SidebarLink from './sidebar-link';

export default function LeftSidebar({ className }: { className?: string }) {
    return (
        <div className={cn('hidden md:block', className)}>
            <h2 className="mb-6 flex gap-3 text-xl font-medium">
                <Pencil /> Left Sidebar
            </h2>
            <ul className="list-inside space-y-1">
                <SidebarLink title="Posts" href="/posts" />
                <SidebarLink title="Teams" href="/teams" />
                <SidebarLink title="Cookie Policy" href="/legal/cookie-policy" />
                <SidebarLink title="Legal Notice" href="/legal/legal-notice" />
                <SidebarLink title="Privacy Policy" href="/legal/privacy-policy" />
                <SidebarLink title="Terms of Service" href="/legal/terms-of-service" />
            </ul>
        </div>
    );
}
