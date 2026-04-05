import { cn } from '@/lib/utils';

interface PublicFooterProps {
    className?: string;
}

export default function ({ className }: PublicFooterProps) {
    return (
        <div
            className={cn(
                'w-full border-t bg-gray-200 dark:bg-gray-900',
                className,
            )}
        >
            <footer className="container mx-auto py-4">
                <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="asd">
                        <h3 className="mb-3 text-2xl font-medium">Legal</h3>
                        <ul>
                            <li>
                                <a href="/disclaimer">Disclaimer</a>
                            </li>
                            <li>
                                <a href="/privacy">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/cookie-policy">Cookie Policy</a>
                            </li>
                            <li>
                                <a href="/terms-of-service">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                    <div className="asd">
                        <h3 className="mb-3 text-2xl font-medium">Title</h3>
                        <ul>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                    <div className="asd">
                        <h3 className="mb-3 text-2xl font-medium">Title</h3>
                        <ul>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                    <div className="asd">
                        <h3 className="mb-3 text-2xl font-medium">Title</h3>
                        <ul>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                            <li>
                                <a href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-600 dark:text-gray-200">
                    Made with ❤️ by{' '}
                    <a
                        href="https://tobias-hopp.de"
                        className="hover:text-primary"
                    >
                        Tobias Hopp
                    </a>
                </div>
                <div className="text-center text-sm text-gray-600 dark:text-gray-200">
                    &copy; {new Date().getFullYear()} webdev-hq.com. All rights
                    reserved.
                </div>
            </footer>
        </div>
    );
}
