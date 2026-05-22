import { Hyperlink } from '@/types';
import { Link } from '@inertiajs/react';

interface HyperlinkCardProps {
    hyperlink: Hyperlink;
}

export default function HyperlinkCard({ hyperlink }: HyperlinkCardProps) {
    return (
        <Link
            href={hyperlink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-72 rounded-lg bg-white p-4 shadow hover:bg-gray-50 dark:bg-neutral-950 dark:hover:bg-neutral-900"
        >
            <h3 className="text-lg font-medium">{hyperlink.title}</h3>
            <p className="mt-1 text-sm text-gray-500">
                {hyperlink.description}
            </p>
            <button
                onClick={
                    () => console.log('Delete hyperlink with ID:', hyperlink.id) // Implement this function to handle deletion
                }
                className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
                Delete
            </button>
        </Link>
    );
}
