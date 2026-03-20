import { cn } from "@/lib/utils";

interface PublicFooterProps {
    className?: string
}

export default function ({ className }: PublicFooterProps) {
    return (
        <div className={cn("w-full bg-neutral-100 dark:bg-neutral-900 border-t", className)}>
            <footer className="container mx-auto flex items-center justify-center py-4">
                <p className="text-sm text-neutral-800 dark:text-neutral-200">WebDev HQ &middot; &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}