import AppLogoIcon from './app-logo-icon';

import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface AppLogoProps {
    logoClassName?: string;
    className?: string;
}

/**
 * A logo component for the application that includes the logo icon and text.
 *
 * @param {AppLogoProps} props - The props for the component
 * @returns {React.ReactNode} - The rendered logo component
 */
export default function AppLogo({ logoClassName, className }: AppLogoProps) {
    return (
        <Link
            href="/"
            className={cn(
                'flex min-w-0 items-center gap-2 group-data-[collapsible=icon]:translate-x-px group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0',
                className,
            )}
            title="Home"
            prefetch
        >
            <AppLogoIcon className={cn('size-8 shrink-0 object-contain', logoClassName)} />

            <div className="grid min-w-0 flex-1 text-left text-sm group-data-[collapsible=icon]:hidden">
                <h1 className="my-3 max-w-45 text-2xl">
                    <div className="flex font-light hover:text-neutral-500" id="logo-text">
                        <span className="web">Web</span>
                        <span className="mr-2 font-medium">Dev</span>
                        <span className="font-medium">HQ</span>
                    </div>
                </h1>
            </div>
        </Link>
    );
}
