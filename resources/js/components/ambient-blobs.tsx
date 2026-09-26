import { cn } from '@/lib/utils';

export default function AmbientBlobs() {
    return (
        <div className={cn('absolute inset-0 z-10')}>
            <div className="ambient-blob absolute -top-40 -left-40 size-128 rounded-full bg-cyan-500/35 blur-[120px]" />
            <div className="ambient-blob absolute top-10 right-48 size-144 rounded-full bg-fuchsia-500/30 blur-[140px] [animation-delay:2s]" />
            <div className="ambient-blob absolute top-[25%] left-[15%] size-112 rounded-full bg-violet-600/30 blur-[120px] [animation-delay:4s]" />
            <div className="ambient-blob absolute top-[30%] right-[10%] size-128 rounded-full bg-blue-500/30 blur-[130px] [animation-delay:6s]" />
            <div className="ambient-blob absolute top-[50%] -left-40 size-120 rounded-full bg-emerald-500/25 blur-[130px] [animation-delay:8s]" />
            <div className="ambient-blob absolute top-[55%] -right-32 size-136 rounded-full bg-pink-500/25 blur-[140px] [animation-delay:10s]" />
            <div className="ambient-blob absolute top-[70%] left-[30%] size-104 rounded-full bg-indigo-500/30 blur-[120px] [animation-delay:12s]" />
            <div className="ambient-blob absolute right-[25%] bottom-48 size-128 rounded-full bg-cyan-400/25 blur-[140px] [animation-delay:14s]" />
            <div className="ambient-blob absolute -bottom-40 -left-20 size-112 rounded-full bg-purple-500/25 blur-[130px] [animation-delay:16s]" />
            <div className="bg-noise absolute inset-0 size-full" />
        </div>
    );
}
