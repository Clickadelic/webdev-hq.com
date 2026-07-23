'use client';

import PublicLayout from '@/layouts/public-layout';

interface LayoutProps {
    canRegister?: boolean;
}

export default function Home({ canRegister = true }: LayoutProps) {
    return (
        <PublicLayout canRegister={canRegister} title="Welcome to WebDev HQ">
            <h1 className="my-5 text-center text-xl">Welcome to WebDev HQ</h1>
        </PublicLayout>
    );
}
