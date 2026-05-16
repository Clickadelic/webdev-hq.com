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
            <div className="my-3 rounded-lg border border-amber-400 bg-white/30 p-1 backdrop-blur">
                <h2 className="text-center font-medium">Suche</h2>
            </div>
        </PublicLayout>
    );
}
