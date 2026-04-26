import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react'; // ShadCN Icons
import { RiHomeLine } from 'react-icons/ri';

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
const PublicBreadcrumbs = () => {
    const { url } = usePage(); // aktueller Pfad z.B. /gerichte/1/edit

    // Auf der Startseite nichts anzeigen
    if (url === '/') return null;

    // Split path und filtern leere Strings
    const segments = url.split('/').filter(Boolean);

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
        <div className="container mx-auto w-full px-2 md:px-0">
            <ul className="flex items-center gap-2 border-b border-neutral-200 py-3 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-200">
                {/* Home */}
                <li>
                    <Link
                        href="/"
                        className="hover:text-primary"
                        aria-label="Homepage"
                        title="Homepage"
                    >
                        <RiHomeLine className="-mt-1 inline" />
                        <span className="sr-only">Homepage</span>
                    </Link>
                </li>

                {crumbs.map((crumb, idx) => (
                    <li key={idx} className="line-clamp-1 flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-neutral-600 dark:text-neutral-200" />
                        {/* Letztes Segment nicht als Link */}
                        {idx === crumbs.length - 1 ? (
                            <span className="line-clamp-1">{crumb.name}</span>
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
