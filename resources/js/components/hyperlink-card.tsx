import { Hyperlink } from '@/types';

import ContextMenu from '@/components/context-menu';

interface HyperlinkCardProps {
    hyperlink: Hyperlink;
}

export default function HyperlinkCard({ hyperlink }: HyperlinkCardProps) {
    return (
        <div className="w-72 rounded-lg bg-white p-2 shadow hover:bg-gray-50 dark:bg-rose-200">
            <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium">{hyperlink.title}</h3>
                <ContextMenu />
            </div>
            <p className="mt-1 text-sm text-gray-500">{hyperlink.url}</p>
            <p className="mt-1 text-sm text-gray-500">
                {hyperlink.description}
            </p>
            {hyperlink.category && (
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {hyperlink.category.name}
                </p>
            )}
            {hyperlink.tags && hyperlink.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {hyperlink.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
