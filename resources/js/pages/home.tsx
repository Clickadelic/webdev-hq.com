import GlassCard from '@/components/glass-card';
import LogoImageSrc from '@/images/icons/icon-128.png';
import PublicLayout from '@/layouts/public-layout';
import { usePage } from '@inertiajs/react';

interface PageProps {
    canRegister?: boolean;
    hyperlinkCount: number;
}
interface LayoutProps {
    canRegister?: boolean;
}

/**
 * The Home component renders the main landing page for the WebDev HQ website.
 *
 * @param  canRegister Indicates whether the registration option should be available.
 * @returns The JSX element representing the Home page.
 */
export default function Home({ canRegister = true }: LayoutProps) {
    const { hyperlinkCount } = usePage<PageProps>().props;
    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            <div className="mb-24 w-full overflow-hidden text-center">
                <h1 className="my-10 text-6xl font-light text-neutral-950 dark:text-white">
                    <img
                        src={LogoImageSrc}
                        alt="WebDev HQ Logo"
                        className="mr-3 inline-block size-12"
                    />
                    Web<span className="font-medium">Dev HQ</span>
                </h1>
                <h2 className="relative mb-4 text-3xl">
                    Your Go-To Destination for Web Developers and alike.
                </h2>
                <p className="font-light text-muted-foreground">
                    Currently tracking{' '}
                    <span className="font-bold text-neutral-950 dark:text-white">
                        {hyperlinkCount}
                    </span>{' '}
                    resources.
                </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <GlassCard title="Find Quality Resources">
                    Explore hundreds of resources for every need you might have.
                </GlassCard>
                <GlassCard title="Get the news">
                    Stay updated with the latest news and trends in web development.
                </GlassCard>
                <GlassCard title="Community">
                    Connect with other web developers, share knowledge, and collaborate on projects.
                </GlassCard>
                <GlassCard title="Build a Team">
                    Manage members, assign roles, and collaborate effectively within your team.
                </GlassCard>
            </div>
        </PublicLayout>
    );
}
