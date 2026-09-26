import PublicLayout from '@/layouts/public-layout';
import LogoImageSrc from "@/images/icons/icon-128.png";

interface LayoutProps {
    canRegister?: boolean;
}

export default function Home({ canRegister = true }: LayoutProps) {
    return (
        <PublicLayout
            canRegister={canRegister}
            outerClassNames="relative"
            title="Welcome to WebDev HQ"
        >
            <div className="relative overflow-hidden text-center">
                <h1 className="flex mx-auto justify-center items-center relative my-10 text-6xl font-light text-neutral-950 dark:text-white">
                    <img src={LogoImageSrc} alt="WebDev HQ Logo" className="inline-block size-12 mr-3" />
                    Web<span className="font-medium">Dev HQ</span>
                </h1>

                <h2 className="relative text-3xl">
                    Your Go-To Destination for Web Developers and alike.
                </h2>
            </div>
			
        </PublicLayout>
    );
}
