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
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>Navigate through the menu options.</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
