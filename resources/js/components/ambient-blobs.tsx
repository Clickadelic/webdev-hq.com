import { cn } from '@/lib/utils';

interface AmbientBlobsProps {
    className?: string;
    isAnimated?: boolean;
}

/**
 * A component that renders animated ambient blobs in the background.
 *
 * @param {boolean} [isAnimated] - Whether the blobs should be animated
 * @param {string} [className] - Additional class names for the container
 * @returns {React.ReactNode} - The rendered ambient blobs component
 */
export default function AmbientBlobs({ isAnimated = false, className }: AmbientBlobsProps) {
    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 z-0 size-full overflow-clip',
                className,
            )}
        >
            <div
                className={cn(
                    'absolute -top-40 -left-40 size-128 rounded-full bg-cyan-500/35 blur-[120px]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div
                className={cn(
                    'absolute top-10 right-48 size-144 rounded-full bg-fuchsia-500/30 blur-[140px] [animation-delay:2s]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div
                className={cn(
                    'absolute top-[25%] left-[15%] size-112 rounded-full bg-violet-600/30 blur-[120px]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div
                className={cn(
                    'absolute top-[30%] right-[10%] size-128 rounded-full bg-blue-500/30 blur-[130px] [animation-delay:6s]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div
                className={cn(
                    'absolute top-[50%] -left-40 size-120 rounded-full bg-emerald-500/25 blur-[130px] [animation-delay:8s]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div
                className={cn(
                    'absolute top-[55%] -right-32 size-136 rounded-full bg-pink-500/25 blur-[140px] [animation-delay:10s]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div
                className={cn(
                    'absolute top-[70%] left-[30%] size-104 rounded-full bg-indigo-500/30 blur-[120px] [animation-delay:12s]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div
                className={cn(
                    'absolute right-[25%] bottom-48 size-128 rounded-full bg-cyan-400/25 blur-[140px] [animation-delay:14s]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div
                className={cn(
                    'absolute -bottom-40 -left-20 size-112 rounded-full bg-purple-500/25 blur-[130px] [animation-delay:16s]',
                    isAnimated ? 'animate-blob' : '',
                )}
            />
            <div className="bg-noise absolute inset-0 size-full" />
        </div>
    );
}
