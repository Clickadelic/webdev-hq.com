import LogoImageSrc from '@/images/icons/icon-128.png';
import PublicLayout from '@/layouts/public-layout';
import { Link, usePage } from '@inertiajs/react';

interface PageProps {
    canRegister?: boolean;
    hyperlinkCount: number;
}

/**
 * The Home component renders the main landing page for the WebDev HQ website.
 *
 * @param  canRegister Indicates whether the registration option should be available.
 * @param  contentClasses An optional class name to apply to the main container.
 * @returns The JSX element representing the Home page.
 */
export default function IndexPage({ canRegister = true }: PageProps) {
    const { hyperlinkCount } = usePage<PageProps>().props;
    return (
        <PublicLayout
            canRegister={canRegister}
            contentClasses="flex flex-col items-center justify-center"
            title="Welcome"
            showTitle={false}
            showGradient
            isInteractive
        >
            <h1 className="mb-10 text-5xl font-light text-white text-shadow-lg text-shadow-black/80">
                <img
                    src={LogoImageSrc}
                    alt="WebDev HQ Logo"
                    className="-mt-2 mr-5 inline-block size-11"
                />
                Web<span className="font-medium">Dev HQ</span>
            </h1>
            <h2 className="relative mb-4 max-w-120 text-center text-3xl text-white text-shadow-lg text-shadow-black/80">
                Your Go-To Destination for Web Developers and alike.
            </h2>
            <p className="mb-12 rounded-full border-border font-light text-white text-shadow-lg text-shadow-black/80 backdrop-blur">
                Currently tracking{' '}
                <span className="font-bold">{hyperlinkCount}</span>{' '}
                resources.
            </p>
            <Link
                href="/hyperlinks"
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80"
                title="Explore Hyperlinks"
            >
                Explore Hyperlinks
            </Link>
        </PublicLayout>
    );
}
