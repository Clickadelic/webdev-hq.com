interface HyperlinkStatusBadgeProps {
    status: string;
}

export default function HyperlinkStatusBadge({
    status,
}: HyperlinkStatusBadgeProps) {
    let badgeColor = 'bg-transparent text-gray-500';
    if (status === 'draft') {
        badgeColor = 'bg-fuchsia-200 border-fuchsia-800 text-fuchsia-800';
    } else if (status === 'published') {
        badgeColor = 'bg-emerald-200 border-emerald-800 text-emerald-800';
    } else if (status === 'archived') {
        badgeColor = 'bg-amber-200 border-amber-800 text-amber-800';
    }

    return (
        <span
            className={`inline-flex w-20 items-center justify-center rounded px-1 py-1 pb-1.5 text-center text-xs font-medium ${badgeColor}`}
        >
            {status}
        </span>
    );
}
