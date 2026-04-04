'use client';

import FrontpageLayout from '@/layouts/frontpage-layout';
import { type Hyperlink } from '@/types';

export default function Welcome({
    hyperlinks,
    canRegister = true,
}: {
    hyperlinks: Hyperlink[];
    canRegister?: boolean;
}) {
    return (
        <FrontpageLayout canRegister={canRegister} title="Welcome">
            <main className="container mx-auto flex flex-col items-center justify-center py-12">
                <h2 className="mb-8 text-4xl font-bold">Welcome</h2>

                {hyperlinks && hyperlinks.length > 0 ? (
                    <div className="grid w-full grid-cols-8 gap-4">
                        {hyperlinks.map((hyperlink) => (
                            <a
                                key={hyperlink.id}
                                href={hyperlink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
                            >
                                <h3 className="text-lg font-semibold">
                                    {hyperlink.title}
                                </h3>
                                {hyperlink.description && (
                                    <p className="mt-1 text-gray-600">
                                        {hyperlink.description}
                                    </p>
                                )}
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        No hyperlinks available yet.
                    </p>
                )}
            </main>
        </FrontpageLayout>
    );
}
