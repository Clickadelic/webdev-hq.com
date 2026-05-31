import AppForm from '@/components/forms/app-form';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Link as LinkIcon, ScreenShare } from 'lucide-react';
import { useState } from 'react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { FiPlus } from 'react-icons/fi';

import { cn } from '@/lib/utils';

/**
 * A circular menu that appears on the bottom right of the screen when the user has the user role.
 * It contains buttons to create a new recipe and to view all ingredients.
 */
export function CircularMenu() {
    const { auth } = usePage<SharedData>().props;
    // States
    const [showCircularMenu, setShowCircularMenu] = useState<boolean>(false);
    const [isAppModalOpen, setIsAppModalOpen] = useState<boolean>(false);
    const [isHyperlinkModalOpen, setIsHyperlinkModalOpen] =
        useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // const [editingAppId, setEditingAppId] = useState<string | null>(null);
    // const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // const [error, setError] = useState<string | undefined>(undefined);
    // const [success, setSuccess] = useState<string | undefined>(undefined);

    // const [isLoading, setIsLoading] = useState<boolean>(false);

    // const openCircularMenu = () => {
    //     setShowCircularMenu(true);
    // };

    // const closeCircularMenu = () => {
    //     setShowCircularMenu(false);
    // };

    // const onEditSubmit = (values: z.infer<typeof HyperlinkSchema>) => {
    //     alert('Yo');
    // };

    // const onAddSubmit = (values: z.infer<typeof HyperlinkSchema>) => {
    //     alert('Yo');
    // };

    if (!auth.user) {
        return null;
    }
    return (
        <div className="fixed right-3 bottom-3 z-20 max-w-12 md:right-8 md:bottom-8 lg:right-12 lg:bottom-12">
            <div
                className={cn(
                    'absolute -top-20 left-2 flex flex-col items-center space-y-2 transition-all',
                    showCircularMenu
                        ? 'opacity-100'
                        : 'pointer-events-none opacity-0',
                )}
            >
                <Dialog
                    open={isAppModalOpen}
                    onOpenChange={(open) => {
                        setIsAppModalOpen(open);
                        if (!open) setIsEditing(false);
                    }}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild data-state="instant-open">
                                <DialogTrigger className="rounded-full bg-primary p-2 text-white shadow-lg hover:cursor-pointer hover:bg-primary/90">
                                    <ScreenShare className="size-4" />
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="text-white">
                                <p>Create new app</p>
                                <TooltipArrow className="fill-primary dark:fill-primary" />
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DialogContent className="rounded">
                        <DialogHeader>
                            <DialogTitle className="flex items-start gap-2">
                                <ScreenShare className="size-4" />
                                {isEditing ? 'Edit App' : 'Add App'}
                            </DialogTitle>
                            <DialogDescription>
                                {isEditing ? 'Edit the App' : 'Add a new App'}
                            </DialogDescription>
                        </DialogHeader>
                        <AppForm className="w-full" />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={isHyperlinkModalOpen}
                    onOpenChange={(open) => {
                        setIsHyperlinkModalOpen(open);
                        if (!open) setIsEditing(false);
                    }}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild data-state="instant-open">
                                <DialogTrigger className="rounded-full bg-primary p-2 text-white shadow-lg hover:cursor-pointer hover:bg-primary/90">
                                    <LinkIcon className="size-4" />
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="text-white">
                                <p>Create new hyperlink</p>
                                <TooltipArrow className="fill-primary dark:fill-primary" />
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DialogContent className="rounded">
                        <DialogHeader>
                            <DialogTitle className="flex items-start gap-2">
                                <LinkIcon className="size-4" />
                                {isEditing ? 'Edit Hyperlink' : 'Add Hyperlink'}
                            </DialogTitle>
                            <DialogDescription>
                                {isEditing ? 'Edit the hyperlink' : 'Add a new hyperlink'}
                            </DialogDescription>
                        </DialogHeader>
                        <HyperlinkForm className="w-full" />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Haupt-Button */}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild data-state="instant-open">
                        <button
                            aria-label={'Create new content'}
                            onClick={() => setShowCircularMenu((prev) => !prev)}
                            className="rounded-full bg-primary p-4 text-lg text-white shadow-lg transition hover:cursor-pointer hover:bg-primary dark:bg-primary"
                        >
                            <FiPlus
                                className={cn(
                                    'transition-transform',
                                    showCircularMenu ? 'rotate-45' : '',
                                )}
                            />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        className="bg-primary text-white dark:bg-primary"
                    >
                        <p>Create new content.</p>
                        <TooltipArrow className="fill-primary dark:fill-primary" />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default CircularMenu;
