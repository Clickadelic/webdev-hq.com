import { cn } from '@/lib/utils';
import { Scale } from 'lucide-react';
import SidebarLink from './sidebar-link';

export default function LegalSidebar({ className }: { className?: string }) {
    return (
        <div className={cn('hidden md:block', className)}>
            <h3 className="mb-6 flex gap-3 text-xl font-medium">
                <Scale className="mt-1 size-5" /> Navigation
            </h3>
            <ul className="list-inside space-y-1">
                <SidebarLink title="Legal Overview" href="/legal" />
                <SidebarLink title="Disclaimer" href="/legal/disclaimer" />
                <SidebarLink title="Legal Notice" href="/legal/legal-notice" />
                <SidebarLink title="Cookie Policy" href="/legal/cookie-policy" />
                <SidebarLink title="Privacy Policy" href="/legal/privacy-policy" />
                <SidebarLink title="Terms of Service" href="/legal/terms-of-service" />
            </ul>
        </div>
    );
}
