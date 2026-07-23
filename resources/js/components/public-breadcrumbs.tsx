import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react'; // ShadCN Icons
import { RiHomeLine } from 'react-icons/ri';

interface BreadCrumbProps {
    className?: string;
}

/**
 * BreadcrumbNav component.
 *
 * Render a breadcrumb navigation based on the current URL.
 *
 * On the start page, nothing is rendered.
 *
 * On other pages, the breadcrumb navigation is rendered with links to
 * the parent pages.
 *
 * @returns {JSX.Element} The breadcrumb navigation component.
 */
const PublicBreadcrumbs = ({ className }: BreadCrumbProps) => {
    const { url } = usePage(); // aktueller Pfad z.B. /gerichte/1/edit
    const pathname = url.split('?')[0];

    // Auf der Startseite nichts anzeigen
    if (pathname === '/') return null;

    // Split path und filtern leere Strings
    const segments = pathname.split('/').filter(Boolean);

    // Pfade für Links zusammensetzen
    const crumbs = segments.map((segment, idx) => {
        const path = '/' + segments.slice(0, idx + 1).join('/');
        // Format: Bindestriche durch Leerzeichen ersetzen, erste Buchstaben groß
        const name = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
        return { name, path };
    });

    return (
        <div className={cn('container mx-auto w-full px-2 md:px-0', className)}>
            <ul className="flex items-center gap-3 py-5 text-sm text-gray-800 dark:text-gray-200">
                {/* Home */}
                <li>
                    <Link
                        href="/"
                        className="hover:text-primary"
                        aria-label="Homepage"
                        title="Homepage"
                    >
                        <RiHomeLine className="-mt-1 inline size-5" />
                        <span className="sr-only">Homepage</span>
                    </Link>
                </li>

                {crumbs.map((crumb, idx) => (
                    <li key={idx} className="line-clamp-1 flex items-center">
                        <ChevronRight className="mr-3 size-5 text-gray-800 dark:text-neutral-200" />
                        {/* Letztes Segment nicht als Link */}
                        {idx === crumbs.length - 1 ? (
                            <span className="line-clamp-1 cursor-default">
                                {crumb.name}
                            </span>
                        ) : (
                            <Link
                                href={crumb.path}
                                className="line-clamp-1 hover:text-primary"
                            >
                                {crumb.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PublicBreadcrumbs;
