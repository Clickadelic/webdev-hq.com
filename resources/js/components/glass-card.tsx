interface GlassCardProps {
    title: string;
    children?: React.ReactNode;
}

export default function GlassCard({ title, children }: GlassCardProps) {
    return (
        <div className="rounded bg-white/30 p-2 backdrop-blur dark:bg-neutral-900/30">
            <div className="rounded-t bg-white px-2 pt-2 dark:bg-neutral-900">
                <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">{title}</h3>
            </div>
            <div className="h-auto rounded-b bg-white px-2 pt-2 pb-4 text-neutral-950 dark:bg-neutral-900 dark:text-white">
                {children}
            </div>
        </div>
    );
}
