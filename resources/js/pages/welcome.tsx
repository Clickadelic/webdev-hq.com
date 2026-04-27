'use client';

import PublicLayout from '@/layouts/public-layout';
import { type Hyperlink } from '@/types';

import { ExternalLink } from 'lucide-react';

export default function Welcome({
    hyperlinks,
    canRegister = true,
}: {
    hyperlinks: Hyperlink[];
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            <div className="bg-gradient-to-br from-indigo-500 to-sky-400 bg-clip-text text-center">
                <h2 className="text-center text-3xl font-medium">Welcome</h2>
            </div>
            {hyperlinks && hyperlinks.length > 0 ? (
                <div className="flex-start flex w-full gap-4">
                    {hyperlinks.map((hyperlink) => (
                        <a
                            key={hyperlink.id}
                            href={hyperlink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-64 rounded-lg border bg-white p-3 shadow transition-colors hover:shadow-lg"
                        >
                            <h3 className="text-md font-semibold text-neutral-800">
                                {hyperlink.title}
                                <ExternalLink className="-mt-1 ml-1 inline-block h-4 w-4 text-neutral-500" />
                            </h3>
                            {hyperlink.description && (
                                <p className="mt-1 text-sm text-neutral-600">
                                    {hyperlink.description}
                                </p>
                            )}
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-neutral-500">No hyperlinks available yet.</p>
            )}
        </PublicLayout>
    );
}
