'use client';

import PublicLayout from '@/layouts/public-layout';

export default function LegalNotice({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Legal Notice">
            <main className="container mx-auto flex flex-col items-center justify-center py-12">
                <h1 className="mb-8 text-4xl font-bold">Legal Notice</h1>
            </main>
        </PublicLayout>
    );
}
