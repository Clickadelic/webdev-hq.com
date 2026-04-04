import { cn } from '@/lib/utils';

interface PublicFooterProps {
    className?: string;
}

export default function ({ className }: PublicFooterProps) {
    return (
        <div
            className={cn(
                'w-full border-t bg-rose-200 dark:bg-neutral-900',
                className,
            )}
        >
            <footer className="container mx-auto flex items-center justify-center py-4"></footer>
        </div>
    );
}
