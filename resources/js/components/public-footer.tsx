import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface PublicFooterProps {
    className?: string;
}

export default function PublicFooter({ className }: PublicFooterProps) {
    return (
        <footer
            className={cn(
                'w-full border-t-2 border-primary bg-neutral-900 px-3 py-6 sm:px-0',
                className,
            )}
        >
            <div className="container mx-auto pt-12 pb-8">
                <div className="flex flex-row items-center justify-center">
                    <ul className="mx-auto mb-4 space-y-3 text-center text-sm sm:flex sm:space-y-0 sm:space-x-3">
                        <li>
                            <Link
                                href="/legal/disclaimer"
                                className="text-sm text-neutral-200 hover:text-primary dark:text-neutral-200"
                                title="Disclaimer"
                            >
                                Disclaimer
                            </Link>
                        </li>
                        <li className="hidden text-primary sm:inline-block">
                            &middot;
                        </li>
                        <li>
                            <Link
                                href="/legal/cookie-policy"
                                className="text-sm text-neutral-200 hover:text-primary dark:text-neutral-200"
                                title="Cookie Policy"
                            >
                                Cookie Policy
                            </Link>
                        </li>

                        <li className="hidden text-primary sm:inline-block">
                            &middot;
                        </li>
                        <li>
                            <Link
                                href="/legal/legal-notice"
                                className="text-sm text-neutral-200 hover:text-primary dark:text-neutral-200"
                                title="Legal Notice"
                            >
                                Legal Notice
                            </Link>
                        </li>
                        <li className="hidden text-primary sm:inline-block">
                            &middot;
                        </li>
                        <li>
                            <Link
                                href="/legal/privacy-policy"
                                className="text-sm text-neutral-200 hover:text-primary dark:text-neutral-200"
                                title="Privacy Policy"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="hidden text-primary sm:inline-block">
                            &middot;
                        </li>
                        <li>
                            <Link
                                href="/legal/terms-of-service"
                                className="text-sm text-neutral-200 hover:text-primary dark:text-neutral-200"
                                title="Terms of Service"
                            >
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="cursor-default text-center text-sm text-neutral-200 dark:text-neutral-200">
                    <p>
                        WebDev HQ &middot; All rights reserved &copy;&nbsp;
                        {new Date().getFullYear()}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
