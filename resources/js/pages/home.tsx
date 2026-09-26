import PublicLayout from '@/layouts/public-layout';
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
                <h1 className="relative my-10 text-6xl font-medium text-white">
                    WebDev HQ
                </h1>

                <h2 className="relative text-3xl">
                    The Go-To Place for Web Developers.
                </h2>
            </div>
        </PublicLayout>
    );
}
