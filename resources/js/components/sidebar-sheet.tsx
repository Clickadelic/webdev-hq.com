import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { GoGear } from 'react-icons/go';

export const SidebarSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="size-10 rounded-xs hover:bg-slate-100">
                    <GoGear className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-5">
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>Background image, logo, and other settings.</SheetDescription>
                </SheetHeader>
                <div className="m-4">Some content</div>
            </SheetContent>
        </Sheet>
    );
};
