import { Hyperlink } from '@/types';

import ContextMenu from '@/components/context-menu';
import { ExternalLink } from 'lucide-react';

interface HyperlinkCardProps {
    hyperlink: Hyperlink;
    onEdit?: (hyperlink: Hyperlink) => void;
    onDelete?: (id: number) => void;
}

export default function HyperlinkCard({
    hyperlink,
    onEdit,
    onDelete,
}: HyperlinkCardProps) {
    return (
        <a
            key={hyperlink.id}
            href={hyperlink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full flex-col gap-2 rounded-xl border border-border bg-white p-3 shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:bg-neutral-900"
        >
            <div className="flex items-start justify-between gap-2">
                <div className="favicon flex items-center gap-2">
                    <img src={hyperlink.favicon_url || ''} alt="favicon" />
                </div>
                <ContextMenu
                    item={hyperlink}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
            <div className="flex-start flex justify-start gap-2">
                <h3 className="text-md truncate leading-tight font-semibold group-hover:text-primary">
                    {hyperlink.title}
                </h3>
                <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            {hyperlink.description && (
                <p className="line-clamp-2 h-10 text-sm text-muted-foreground">
                    {hyperlink.description}
                </p>
            )}
            {hyperlink.category && (
                <div className="flex items-start justify-between gap-2">
                    <span className="w-fit rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold">
                        {hyperlink.category.name}
                    </span>
                </div>
            )}

            {hyperlink.tags && hyperlink.tags.length > 0 && (
                <div className="flex items-start justify-start gap-2">
                    {hyperlink.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="flex gap-2 py-0.5 text-[10px] font-medium text-primary"
                        >
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}

            <div className="mt-auto flex items-start justify-between gap-2">
                <p className="truncate text-sm font-bold text-primary">
                    {hyperlink.url.replace(/^https?:\/\//, '')}
                </p>
            </div>
        </a>
    );
}
