import { Hyperlink } from '@/types';
import { Link } from '@inertiajs/react';

import ContextMenu from '@/components/context-menu';

interface HyperlinkCardProps {
    hyperlink: Hyperlink;
}

export default function HyperlinkCard({ hyperlink }: HyperlinkCardProps) {
    return (
        <Link
            href={hyperlink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-72 rounded-lg bg-white shadow hover:bg-gray-50 dark:bg-neutral-900"
        >
            <div className="flex items-end justify-between gap-2">
                <h3 className="font-medium">{hyperlink.title}</h3>
                <ContextMenu />
            </div>
            <p className="mt-1 text-sm text-gray-500">
                {hyperlink.description}
            </p>
        </Link>
    );
}
