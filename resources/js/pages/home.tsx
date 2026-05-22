'use client';

import PublicLayout from '@/layouts/public-layout';
import { type Hyperlink } from '@/types';

export default function Home({
    hyperlinks,
    canRegister = true,
}: {
    hyperlinks: Hyperlink[];
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            <div className="rounded-lg bg-white/30 p-1 backdrop-blur">
                <form className="rounded-lg bg-white p-1 dark:bg-neutral-950">
                    <input
                        type="text"
                        placeholder="Search for a resource"
                        className="w-full rounded-md px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-primary focus:ring-primary focus:outline-none sm:text-sm"
                    />
                </form>
            </div>
            {hyperlinks.length === 0 && (
                <h2 className="my-12 text-center font-medium">
                    Keine Hyperlinks gefunden
                </h2>
            )}
        </PublicLayout>
    );
}
