"use client";

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
            <main className="container mx-auto flex flex-col items-center justify-center py-12">
                <h1 className="text-4xl font-bold mb-8">Welcome</h1>
                
                {hyperlinks && hyperlinks.length > 0 ? (
                    <div className="grid gap-4 w-full max-w-2xl">
                        {hyperlinks.map((hyperlink) => (
                            <a
                                key={hyperlink.id}
                                href={hyperlink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="font-semibold text-lg">{hyperlink.title}</h3>
                                {hyperlink.description && (
                                    <p className="text-gray-600 mt-1">{hyperlink.description}</p>
                                )}
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hyperlinks available yet.</p>
                )}
            </main>
        </PublicLayout>
    );
}
