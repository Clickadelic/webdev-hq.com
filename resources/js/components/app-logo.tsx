import AppLogoIcon from './app-logo-icon';

import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/" prefetch>
            <div className="flex items-center" id="logo" title="WebDev HQ">
                <div className="flex aspect-square size-8 items-center justify-center">
                    <AppLogoIcon className="size-6" />
                </div>
                <div className="ml-1 grid flex-1 text-left text-sm">
                    <h1 className="my-3 max-w-[180px] text-2xl">
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
            </div>
        </Link>
    );
}
