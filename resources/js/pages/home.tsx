'use client';

import HyperlinkCard from '@/components/hyperlink-card';
import PublicLayout from '@/layouts/public-layout';

import { type Hyperlink } from '@/types';

export default function Home({
    hyperlinks,
    canRegister = true,
}: {
    hyperlinks: Hyperlink[];
    canRegister?: boolean;
}) {
    console.log(hyperlinks);

    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            <div className="mx-auto my-24 w-96 rounded-lg bg-white/30 p-1 backdrop-blur">
                <form className="rounded-lg bg-white p-1 dark:bg-neutral-950">
                    <input
                        type="text"
                        placeholder="Search for a resource"
                        className="w-full rounded-md px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-primary focus:ring-primary focus:outline-none sm:text-sm"
                    />
                </form>
            </div>
            {hyperlinks.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-6">
                    {hyperlinks.map((hyperlink) => (
                        <HyperlinkCard
                            key={hyperlink.id}
                            hyperlink={hyperlink}
                        />
                    ))}
                </div>
            )}
            {hyperlinks.length === 0 && (
                <h2 className="my-24 text-center font-medium">
                    No hyperlinks found.
                </h2>
            )}
        </PublicLayout>
    );
}
