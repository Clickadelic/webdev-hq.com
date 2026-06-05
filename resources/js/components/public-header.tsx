import { dashboard, login, register } from '@/routes';
import { Link, usePage } from '@inertiajs/react';

import AppLogo from '@/components/app-logo';

import { type SharedData } from '@/types';

import { cn } from '@/lib/utils';
import { CircleCheckBig, DoorOpen, LayoutDashboard } from 'lucide-react';

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
        <header
            className={cn(
                'mb-3 w-full bg-white shadow dark:bg-neutral-900',
                className,
            )}
        >
            <div className="container mx-auto flex justify-between px-3 sm:px-0">
                <div className="relative flex content-center items-center justify-between gap-4 sm:gap-8 md:gap-16 md:space-x-2 lg:gap-32 lg:space-x-4">
                    <AppLogo className="lg:mr-24" logoClassName="size-7 mr-3" />
                </div>
                <nav className="flex w-full items-center justify-between gap-4">
                    <ul className="flex items-start gap-4">
                        <li>
                            <Link href="/" className="font-medium" title="Home">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {auth.user ? (
                        <ul className="my-2.5 flex justify-end gap-3">
                            <li>
                                <Link
                                    href={dashboard()}
                                    className="flex items-center justify-start gap-2 rounded-sm bg-primary px-3 py-1.5 text-sm leading-normal text-white hover:border-[#1915014a] hover:bg-primary/90"
                                    title="Dashboard"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="my-2.5 flex justify-end gap-3">
                            {canRegister && (
                                <li>
                                    <Link
                                        href={register()}
                                        className="flex items-center justify-between gap-2 rounded-sm border border-slate-200 px-3 py-2 text-slate-800 hover:bg-slate-100 hover:text-primary"
                                    >
                                        <CircleCheckBig className="size-4" />
                                        Register
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link
                                    href={login()}
                                    className="hover:bg-primary-hover flex items-center justify-between gap-2 rounded-sm border border-slate-200 bg-primary px-3 py-2 text-white hover:bg-primary/90"
                                >
                                    <DoorOpen className="size-4" />
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
}
