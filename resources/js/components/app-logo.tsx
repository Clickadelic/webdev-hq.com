import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <AppLogoIcon />
                {/* <img src="./icons/extension/icon-128.png" className="bg-white group-hover:opacity-80" width="32" height="32" alt="WebDev HQ Logo" /> */}
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
        </>
    );
}
