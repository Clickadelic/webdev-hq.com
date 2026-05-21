import AppLogoIcon from './app-logo-icon';

import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface AppLogoProps {
    logoClassName?: string;
    className?: string;
}

export default function AppLogo({ logoClassName, className }: AppLogoProps) {
    return (
        <Link
            href="/"
            className={cn('flex items-center gap-2', className)}
            title="Home"
            prefetch
        >
            <AppLogoIcon className={cn('flex', logoClassName)} />

            <div className="grid flex-1 text-left text-sm">
                <h1 className="my-3 max-w-45 text-2xl">
                    <div
                        className="flex font-light hover:text-neutral-500"
                        id="logo-text"
                    >
                        <span className="web">Web</span>
                        <span className="mr-2 font-medium">Dev</span>
                        <span className="font-medium">HQ</span>
                    </div>
                </h1>
            </div>
        </Link>
    );
}
