import { Scale } from 'lucide-react';
import SidebarLink from './sidebar-link';
export default function SidebarLeft() {
    return (
        <aside className="hidden w-64 px-4 py-2 md:block">
            <h2 className="mb-6 flex gap-3 text-xl font-medium">
                <Scale /> Navigation
            </h2>
            <ul className="list-inside space-y-1">
                {/* <SidebarLink title="Legal Overview" href="/legal" /> */}
                <SidebarLink title="Disclaimer" href="/legal/disclaimer" />
                <SidebarLink
                    title="Cookie Policy"
                    href="/legal/cookie-policy"
                />
                <SidebarLink title="Legal Notice" href="/legal/legal-notice" />
                <SidebarLink
                    title="Privacy Policy"
                    href="/legal/privacy-policy"
                />
                <SidebarLink
                    title="Terms of Service"
                    href="/legal/terms-of-service"
                />
            </ul>
        </aside>
    );
}
