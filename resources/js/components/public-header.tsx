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
        <div className={cn('w-full bg-white shadow', className)}>
            <header className="container mx-auto flex items-center justify-between rounded-lg bg-rose-200 px-2 dark:bg-neutral-900">
                <AppLogo />
                <nav className="flex items-center justify-end gap-4">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            )}
                        </>
                    )}
                </nav>
            </header>
        </div>
    );
}
