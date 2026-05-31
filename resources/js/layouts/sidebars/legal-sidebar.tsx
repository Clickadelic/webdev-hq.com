import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
export default function LeftSidebar() {
    return (
        <aside>
            <h3 className="mb-2 text-lg font-medium">Navigation</h3>
            <ul className="list-inside">
                <li>
                    <Link
                        href="/disclaimer"
                        className="flex flex-row gap-2 hover:text-white hover:underline hover:underline-offset-2"
                        title="Disclaimer"
                    >
                        <ChevronRight /> Disclaimer
                    </Link>
                </li>
                <li>
                    <Link
                        href="/cookie-policy"
                        className="flex flex-row gap-2 hover:text-white hover:underline hover:underline-offset-2"
                        title="Cookie Policy"
                    >
                        <ChevronRight /> Cookie Policy
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex flex-row gap-2 hover:text-white hover:underline hover:underline-offset-2"
                        title="LinkTitle"
                    >
                        <ChevronRight /> Link
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex flex-row gap-2 hover:text-white hover:underline hover:underline-offset-2"
                        title="LinkTitle"
                    >
                        <ChevronRight /> Link
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex flex-row gap-2 hover:text-white hover:underline hover:underline-offset-2"
                        title="LinkTitle"
                    >
                        <ChevronRight /> Link
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex flex-row gap-2 hover:text-white hover:underline hover:underline-offset-2"
                        title="LinkTitle"
                    >
                        <ChevronRight /> Link
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
