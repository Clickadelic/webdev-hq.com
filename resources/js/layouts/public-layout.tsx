import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface PublicLayoutProps {
    title?: string
    children: React.ReactNode
    canRegister?: boolean
}

/**
 * A public layout component that wraps its children in a
 * div with a class of "flex flex-col min-h-dvh justify-between items-center"
 * 
 * @param {React.ReactNode} children - The children of the component
 * @returns {React.ReactNode} - The wrapped children
 */
export default function PublicLayout({ title, children, canRegister }: PublicLayoutProps) {
    const { auth, quote } = usePage<SharedData>().props;

    return (
        <>
            <Head title={title} />
            <div className="flex flex-col min-h-dvh justify-between items-center">
                <div className="w-full bg-white shadow">
                    <header className="container mx-auto flex items-center justify-between">
                        <h1>Public Layout</h1>
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
                {children}
                <div className="w-full bg-gray-200 shadow p-4">
                    <footer className="container mx-auto flex items-center justify-center">
                        <p>{quote && quote.message}</p>
                    </footer>
                </div>
            </div>
        </>
    );
}