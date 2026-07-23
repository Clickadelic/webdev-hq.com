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
            <div className="container mx-auto py-3">
                <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-200">
                            WebDev HQ Chrome-Extension
                        </h3>
                        <p className="mt-2 text-sm text-neutral-200">
                            We are striving to give you the best web experience
                            possible. That's why we have developed a Chrome
                            Extension to replace the NewTab as a startpage in
                            Chrome. It is not published yet, but you can already
                            give it a try and download it here.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-200">
                            About Us
                        </h3>
                        <p className="mt-2 text-sm text-neutral-200">
                            Welcome to WebDevHQ, your go-to destination for web
                            development resources. We are a community of
                            passionate developers dedicated to sharing knowledge
                            and exploring the latest trends in the world of web
                            development.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-200">
                            About Us
                        </h3>
                        <p className="mt-2 text-sm text-neutral-200">
                            Welcome to WebDevHQ, your go-to destination for web
                            development resources. We are a community of
                            passionate developers dedicated to sharing knowledge
                            and exploring the latest trends in the world of web
                            development.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-200">
                            About Us
                        </h3>
                        <p className="mt-2 text-sm text-neutral-200">
                            Welcome to WebDevHQ, your go-to destination for web
                            development resources. We are a community of
                            passionate developers dedicated to sharing knowledge
                            and exploring the latest trends in the world of web
                            development.
                        </p>
                    </div>
                </div>
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
