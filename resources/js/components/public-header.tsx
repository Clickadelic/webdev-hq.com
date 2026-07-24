import AppLogo from '@/components/app-logo';
import UserDropdownMenu from '@/components/user-dropdown-menu';

import AppearanceDropdown from '@/components/appearance-dropdown';
import { cn } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Blocks,
    CircleCheckBig,
    DoorOpen,
    LayoutDashboard,
    Link as LinkIcon,
    Pencil,
} from 'lucide-react';

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
                'w-full bg-white shadow dark:bg-neutral-900',
                className,
            )}
        >
            <div className="container mx-auto flex justify-between px-3 sm:px-0">
                <div className="relative flex content-center items-center justify-between gap-4 sm:gap-8 md:gap-16 md:space-x-2 lg:gap-32 lg:space-x-4">
                    <AppLogo className="lg:mr-24" logoClassName="size-7 mr-3" />
                </div>
                <nav className="flex w-full items-center justify-between gap-4">
                    <ul className="hidden items-start gap-4 lg:flex">
                        <li>
                            <Link
                                hrefLang="en"
                                href="/posts"
                                className="flex items-center gap-2 hover:text-primary"
                                title="Posts"
                                aria-label="Posts"
                            >
                                <Pencil className="size-4" /> Posts
                            </Link>
                        </li>
                        <li>
                            <Link
                                hrefLang="en"
                                href="/hyperlinks"
                                className="flex items-center gap-2 hover:text-primary"
                                title="Hyperlinks"
                                aria-label="Hyperlinks"
                            >
                                <LinkIcon className="size-4" /> Hyperlinks
                            </Link>
                        </li>
                        <li>
                            <Link
                                hrefLang="en"
                                href="/chrome-extension"
                                className="flex items-center gap-2 hover:text-primary"
                                title="Chrome Extension"
                                aria-label="Chrome Extension"
                            >
                                <Blocks className="size-4" /> Chrome Extension
                            </Link>
                        </li>
                    </ul>
                    <div className="flex-start flex items-center gap-3">
                        {auth.user ? (
                            <ul className="my-2.5 flex justify-end gap-3">
                                <li>
                                    <Link
                                        href={dashboard.url()}
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
                                            href={register.url()}
                                            className="flex items-center justify-between gap-2 rounded-sm border border-border px-3 py-2 text-slate-800 hover:bg-slate-100 hover:text-primary dark:border-neutral-600 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700 dark:hover:text-primary"
                                        >
                                            <CircleCheckBig className="size-4" />
                                            Register
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link
                                        href={login.url()}
                                        className="hover:bg-primary-hover flex items-center justify-between gap-2 rounded-sm border border-slate-200 bg-primary px-3 py-2 text-white hover:bg-primary/90"
                                    >
                                        <DoorOpen className="size-4" />
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        )}
                        {auth.user ? (
                            <UserDropdownMenu user={auth.user} />
                        ) : null}
                        <AppearanceDropdown />
                    </div>
                </nav>
            </div>
        </header>
    );
}
