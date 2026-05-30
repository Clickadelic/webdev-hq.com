import { dashboard, login, register } from '@/routes';
import { Link, usePage } from '@inertiajs/react';

import AppLogo from '@/components/app-logo';

import { type SharedData } from '@/types';

import { cn } from '@/lib/utils';

interface PublicHeaderProps {
    canRegister?: boolean;
    className?: string;
}

export default function PublicHeader({
    canRegister = true,
    className,
}: PublicHeaderProps) {
    const { auth } = usePage<SharedData>().props;
    return (
        <div
            className={cn(
                'mb-3 w-full bg-white shadow dark:bg-neutral-900',
                className,
            )}
        >
            <header className="container mx-auto flex items-center justify-between">
                <AppLogo className="lg:mr-24" logoClassName="size-7 mr-3" />
                <nav className="flex w-full items-center justify-between gap-4">
                    <ul className="flex items-start gap-4">
                        <li>
                            <Link href="/" className="font-medium" title="Home">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {auth.user ? (
                        <ul className="flex-end flex items-center gap-4">
                            <li>
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="flex-end flex items-center gap-4">
                            <li>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Log in
                                </Link>
                            </li>
                            {canRegister && (
                                <li>
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </li>
                            )}
                        </ul>
                    )}
                </nav>
            </header>
        </div>
    );
}
