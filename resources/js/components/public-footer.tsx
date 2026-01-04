import { cn } from "@/lib/utils";

interface PublicFooterProps {
    className?: string
}

export default function ({ className }: PublicFooterProps) {
    return (
        <div className={cn("w-full bg-white border-t", className)}>
            <footer className="container mx-auto flex items-center justify-center py-4">
                <p className="text-sm text-gray-800 dark:text-gray-200">WebDev HQ &middot; &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}