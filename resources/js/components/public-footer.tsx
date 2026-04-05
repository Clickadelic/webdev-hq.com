import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

import { ChevronRight } from 'lucide-react'; // ShadCN Icons

interface PublicFooterProps {
    className?: string;
}

export default function ({ className }: PublicFooterProps) {
    return (
        <div
            className={cn(
                'w-full border-t-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900',
                className,
            )}
        >
            <footer className="container mx-auto py-6">
                <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="spacer">
                        <h3 className="mb-6 text-2xl">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/disclaimer"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Disclaimer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="spacer">
                        <h3 className="mb-6 text-2xl">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/disclaimer"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Disclaimer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-200"
                                >
                                    <ChevronRight />
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="spacer">
                        <h3 className="mb-6 text-2xl">Title</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="spacer">
                        <h3 className="mb-6 text-2xl">Title</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                            <li>
                                <Link href="#">Link</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 
                <div className="mb-4 text-center text-sm text-gray-600 dark:text-gray-200 hover:text-primary">
                    Made with ❤️ by{' '}
                    <a
                        href="https://tobias-hopp.de"
                        className="hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Tobias Hopp
                    </a>
                </div> */}
                <div className="cursor-default text-center text-sm text-gray-600 dark:text-gray-200">
                    WebDev HQ &middot; All rights reserved{' '}
                    {new Date().getFullYear()} &copy;.
                </div>
            </footer>
        </div>
    );
}
