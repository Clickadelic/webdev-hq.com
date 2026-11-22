import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';

import { Link } from '@inertiajs/react';
import AppLogo from '@/layouts/dashboard-layout/app-logo';

interface MobileSheetProps {
    className?: string;
}

export default function MobileSheet({ className }: MobileSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild className={className}>
                <Button variant="ghost">
                    <PanelLeft className="size-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
					<SheetTitle><AppLogo /></SheetTitle>
                    {/* <SheetDescription>Navigate through the menu options.</SheetDescription> */}
                </SheetHeader>
				<div className="rounded bg-neutral-200 dark:bg-neutral-800 flex flex-col items-center justify-start h-full mx-5">
					<ul>
						<li><Link href="/" title="Home">Home</Link></li>
					</ul>
				</div>
            </SheetContent>
        </Sheet>
    );
}
