import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface PublicFooterProps {
    className?: string;
}

export default function PublicFooter({ className }: PublicFooterProps) {
    return (
        <div
            className={cn(
                'w-full border-t-2 border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-700',
                className,
            )}
        >
            <footer className="container mx-auto py-6">
                <div className="flex flex-row items-center justify-center">
                    <ul className="mx-auto mb-4 space-y-3 text-center text-sm sm:flex sm:space-y-0 sm:space-x-3">
                        <li>
                            <Link
                                href="/cookie-policy"
                                className="text-sm hover:text-primary"
                                title="Cookie Policy"
                            >
                                Cookie Policy
                            </Link>
                        </li>
                        <li className="hidden sm:inline-block">&middot;</li>
                        <li>
                            <Link
                                href="/disclaimer"
                                className="text-sm hover:text-primary"
                                title="Disclaimer"
                            >
                                Disclaimer
                            </Link>
                        </li>
                        <li className="hidden sm:inline-block">&middot;</li>
                        <li>
                            <Link
                                href="/legal-notice"
                                className="text-sm hover:text-primary"
                                title="Legal Notice"
                            >
                                Legal Notice
                            </Link>
                        </li>
                        <li className="hidden sm:inline-block">&middot;</li>
                        <li>
                            <Link
                                href="/privacy-policy"
                                className="text-sm hover:text-primary"
                                title="Privacy Policy"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="hidden sm:inline-block">&middot;</li>
                        <li>
                            <Link
                                href="/terms-of-service"
                                className="text-sm hover:text-primary"
                                title="Terms of Service"
                            >
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="cursor-default text-center text-sm text-gray-600 dark:text-gray-200">
                    <p>
                        WebDev HQ &middot; All rights reserved{' '}
                        {new Date().getFullYear()} &copy;.
                    </p>
                </div>
            </footer>
        </div>
    );
}
