import PublicSidebarLeftLayout from '@/layouts/public-sidebar-left-layout';
import { Link } from '@inertiajs/react';
export default function LegalIndex({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicSidebarLeftLayout canRegister={canRegister} title="Legal">
            <div>
                <h2 className="mb-3 text-2xl font-semibold">
                    Legal Information
                </h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Link href="/legal/disclaimer">Disclaimer</Link>
                    <Link href="/legal/cookie-policy">Cookie Policy</Link>
                    <Link href="/legal/cookie-policy">Cookie Policy</Link>
                    <Link href="/legal/cookie-policy">Cookie Policy</Link>
                    <Link href="/legal/cookie-policy">Cookie Policy</Link>
                </div>
            </div>
        </PublicSidebarLeftLayout>
    );
}
