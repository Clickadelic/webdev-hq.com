import { Hyperlink } from '@/types';

import ContextMenu from '@/components/context-menu';
import { ExternalLink, Tag as TagIcon } from 'lucide-react';

interface HyperlinkCardProps {
    hyperlink: Hyperlink;
    onEdit?: (hyperlink: Hyperlink) => void;
    onDelete?: (id: number) => void;
}

export default function HyperlinkCard({ hyperlink, onEdit, onDelete }: HyperlinkCardProps) {
    return (
        <a
            key={hyperlink.id}
            href={hyperlink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-72 flex-col gap-1 rounded-xl border border-border bg-white p-3 shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:bg-neutral-900"
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-start flex justify-start gap-2">
                    <h3 className="truncate text-sm leading-tight font-semibold group-hover:text-primary">
                        {hyperlink.title}
                    </h3>

                    <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <ContextMenu item={hyperlink} onEdit={onEdit} onDelete={onDelete} />
            </div>

            {hyperlink.category && (
                <span className="w-fit rounded-md border border-muted bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {hyperlink.category.name}
                </span>
            )}

            {hyperlink.description && (
                <p className="line-clamp-2 text-xs text-muted-foreground">
                    {hyperlink.description}
                </p>
            )}

            <p className="mt-auto truncate text-xs font-medium text-primary/70">
                {hyperlink.url.replace(/^https?:\/\//, '')}
            </p>

            {hyperlink.tags && hyperlink.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                    <TagIcon className="size-3 text-muted-foreground" />
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
        </a>
    );
}
