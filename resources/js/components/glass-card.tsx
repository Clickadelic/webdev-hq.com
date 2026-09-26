interface GlassCardProps {
    title: string;
    children?: React.ReactNode;
}

export default function GlassCard({ title, children }: GlassCardProps) {
    return (
        <div className="rounded bg-white/30 p-1 backdrop-blur-md">
            <div className="rounded-t bg-white px-2 pt-2">
                <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-200">
                    {title}
                </h3>
            </div>
            <div className="h-auto rounded-b bg-white px-2 pb-4">{children}</div>
        </div>
    );
}
