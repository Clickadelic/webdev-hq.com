import { Head } from '@inertiajs/react';

import PublicHeader from '@/components/public-header';
import PublicFooter from '@/components/public-footer';

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

    return (
        <>
            <Head title={title} />
            <div className="flex flex-col min-h-dvh justify-between items-center">
                <PublicHeader canRegister={canRegister} />
                {children}
                <PublicFooter />
            </div>
        </>
    );
}