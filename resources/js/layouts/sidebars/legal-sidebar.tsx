import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
export default function LeftSidebar() {
    return (
        <aside>
            <h3 className="mb-3 text-2xl font-medium">Navigation</h3>
            <ul className="list-inside">
                <li>
                    <Link
                        href="/legal/disclaimer"
                        className="flex flex-row gap-2 hover:text-primary hover:underline hover:underline-offset-2"
                        title="Disclaimer"
                    >
                        <ChevronRight /> Disclaimer
                    </Link>
                </li>
                <li>
                    <Link
                        href="/legal/cookie-policy"
                        className="flex flex-row gap-2 hover:text-primary hover:underline hover:underline-offset-2"
                        title="Cookie Policy"
                    >
                        <ChevronRight /> Cookie Policy
                    </Link>
                </li>
                <li>
                    <Link
                        href="/legal/legal-notice"
                        className="flex flex-row gap-2 hover:text-primary hover:underline hover:underline-offset-2"
                        title="Legal Notice"
                    >
                        <ChevronRight /> Legal Notice
                    </Link>
                </li>
                <li>
                    <Link
                        href="/legal/privacy-policy"
                        className="flex flex-row gap-2 hover:text-primary hover:underline hover:underline-offset-2"
                        title="Privacy Policy"
                    >
                        <ChevronRight /> Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link
                        href="/legal/terms-of-service"
                        className="flex flex-row gap-2 hover:text-primary hover:underline hover:underline-offset-2"
                        title="Terms of Service"
                    >
                        <ChevronRight /> Terms of Service
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
