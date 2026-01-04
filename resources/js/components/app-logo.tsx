import AppLogoIcon from './app-logo-icon';
import { Link } from '@inertiajs/react';
export default function AppLogo() {
    return (
        <Link href="/" className="flex items-center" id="logo" title="WebDev HQ">
            <div className="flex aspect-square size-8 items-center justify-center">
                <AppLogoIcon className="size-6" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <h1 className="text-2xl my-3 max-w-[180px]">
                    <div className="font-light flex hover:text-slate-500" id="logo-text">
                        <span className="web">Web</span>
                        <span className="font-medium mr-2">Dev</span>
                        <span className="font-medium">HQ</span>
                    </div>
                </h1>
            </div>
        </Link>
    );
}
