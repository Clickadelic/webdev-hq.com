import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface SidebarLinkProps {
    href: string;
    title: string;
}

export default function SidebarLink({ href, title }: SidebarLinkProps) {
    const { url } = usePage();

    // Prüfen, ob die aktuelle URL mit dem href des Links übereinstimmt
    // (nutzt hier einen einfachen Exact Match, kann bei Bedarf angepasst werden)
    const isActive = url === href;

    return (
        <li>
            <Link
                href={href}
                className={cn(
                    'flex flex-row gap-4 rounded p-2 transition-colors hover:bg-slate-200 hover:text-primary',
                    isActive &&
                        'underline-primary font-semibold underline-offset-2',
                )}
                title={title}
            >
                <ChevronRight /> {title}
            </Link>
        </li>
    );
}
