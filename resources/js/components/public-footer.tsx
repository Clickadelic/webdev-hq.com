import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface PublicFooterProps {
    className?: string;
}

/**
 * A public footer component that displays links and information at the bottom of the page.
 * @param {props.className} className - An optional class name to apply to the footer element
 * @returns {React.ReactNode} - The rendered public footer component
 */
export default function PublicFooter({ className }: PublicFooterProps) {
    return (
        <footer
            className={cn(
                'z-20 w-full border-t-2 border-primary bg-white px-3 py-6 backdrop-blur sm:px-0 dark:bg-neutral-900',
                className,
            )}
        >
            <div className="container mx-auto py-3">
                <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-200">
                            Free title
                        </h3>
                        <p className="mt-2 text-sm text-neutral-950 dark:text-neutral-200">
                            Free column
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-200">
                            Free
                        </h3>
                        <p className="mt-2 text-sm text-neutral-950 dark:text-neutral-200">
                            Free column
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-200">
                            Free
                        </h3>
                        <p className="mt-2 text-sm text-neutral-950 dark:text-neutral-200">
                            Free column
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-200">
                            About Us
                        </h3>
                        <ul>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-neutral-950 hover:text-primary dark:text-neutral-200"
                                    title="Contact"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mb-0 flex flex-row items-center justify-center">
                    <ul className="mx-auto mb-4 space-y-3 text-center text-sm sm:flex sm:space-y-0 sm:space-x-3">
                        <li>
                            <Link
                                href="/legal/disclaimer"
                                className="text-sm text-neutral-950 hover:text-primary dark:text-neutral-200"
                                title="Disclaimer"
                            >
                                Disclaimer
                            </Link>
                        </li>
                        <li className="hidden text-primary sm:inline-block">&middot;</li>
                        <li>
                            <Link
                                href="/legal/cookie-policy"
                                className="text-sm text-neutral-950 hover:text-primary dark:text-neutral-200"
                                title="Cookie Policy"
                            >
                                Cookie Policy
                            </Link>
                        </li>
                        <li className="hidden text-primary sm:inline-block">&middot;</li>
                        <li>
                            <Link
                                href="/legal/legal-notice"
                                className="text-sm text-neutral-950 hover:text-primary dark:text-neutral-200"
                                title="Legal Notice"
                            >
                                Legal Notice
                            </Link>
                        </li>
                        <li className="hidden text-primary sm:inline-block">&middot;</li>
                        <li>
                            <Link
                                href="/legal/privacy-policy"
                                className="text-sm text-neutral-950 hover:text-primary dark:text-neutral-200"
                                title="Privacy Policy"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="hidden text-primary sm:inline-block">&middot;</li>
                        <li>
                            <Link
                                href="/legal/terms-of-service"
                                className="text-sm text-neutral-950 hover:text-primary dark:text-neutral-200"
                                title="Terms of Service"
                            >
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="cursor-default text-center text-sm text-neutral-950 dark:text-neutral-200">
                    <p>
                        WebDev HQ &middot; All rights reserved &copy;&nbsp;
                        {new Date().getFullYear()}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
