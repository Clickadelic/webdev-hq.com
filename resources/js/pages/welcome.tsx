'use client';

import PublicLayout from '@/layouts/public-layout';
import { type Hyperlink } from '@/types';

export default function Welcome({
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    />
                </form>
            </div>
            {hyperlinks.length === 0 && (
                <div className="my-3 rounded-lg border border-amber-400 bg-white/30 p-1 backdrop-blur">
                    <h2 className="text-center font-medium">
                        Keine Hyperlinks gefunden
                    </h2>
                </div>
            )}
        </PublicLayout>
    );
}
