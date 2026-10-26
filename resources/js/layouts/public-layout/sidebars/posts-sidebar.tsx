import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import SidebarLink from './sidebar-link';

export default function PostsSidebar({ className }: { className?: string }) {
    return (
        <div className={cn('hidden md:block', className)}>
            <h2 className="mb-6 flex gap-3 text-xl font-medium">
                <Pencil className="size-5 mt-1" /> Posts
            </h2>
            <ul className="list-inside space-y-1">
                <SidebarLink title="Posts" href="/posts" />
                <SidebarLink title="Teams" href="/teams" />
                <SidebarLink title="Chrome Extension" href="/chrome-extension" />
            </ul>
        </div>
    );
}
