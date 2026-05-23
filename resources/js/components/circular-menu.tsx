import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HyperlinkSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { BsApp, BsLink } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';
import * as z from 'zod';
import { toast } from 'sonner';
import { BsTrash } from 'react-icons/bs';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { FiPlus } from 'react-icons/fi';
import { Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A circular menu that appears on the bottom right of the screen when the user has the user role.
 * It contains buttons to create a new recipe and to view all ingredients.
 */
export function CircularMenu() {
    const { auth } = usePage<SharedData>().props;
    // States
    const [showCircularMenu, setShowCircularMenu] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingAppId, setEditingAppId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof HyperlinkSchema>>({
        resolver: zodResolver(HyperlinkSchema),
        defaultValues: { title: '', url: '' },
    });

    const { handleSubmit } = form;

    const openCircularMenu = () => {
        setShowCircularMenu(true);
    };

    const closeCircularMenu = () => {
        setShowCircularMenu(false);
    };

    const onEditSubmit = (values: z.infer<typeof HyperlinkSchema>) => {
        alert('Yo');
    };

    const onAddSubmit = (values: z.infer<typeof HyperlinkSchema>) => {
        alert('Yo');
    };

    if (!auth.user) {
        return null;
    }
    return (

        <div className="fixed right-3 bottom-3 z-20 max-w-12 md:right-8 md:bottom-8 lg:right-12 lg:bottom-12">
            <div
                className={cn(
                    'absolute -top-20 left-1 flex flex-col items-center space-y-2 transition-all',
                    'absolute -top-20 left-1 flex flex-col items-center space-y-2 transition-all',
                    showCircularMenu
                        ? 'opacity-100'
                        : 'pointer-events-none opacity-0',
                )}
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild data-state="instant-open">
                            <Dialog
                                open={isModalOpen}
                                onOpenChange={(open) => {
                                    setIsModalOpen(open);
                                    if (!open) {
                                        setIsEditing(false);
                                        setEditingAppId(null);
                                        form.reset();
                                    }
                                }}
                            >
                                <DialogTrigger
                                    onClick={() => setIsModalOpen(true)}
                                    className="rounded-full bg-primary p-2 text-white shadow-lg hover:cursor-pointer hover:bg-primary/90"
                                >
                                    <LinkIcon />
                                </DialogTrigger>
                                <DialogContent className="rounded">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-start gap-2">
                                            <Link />
                                            {isEditing
                                                ? 'Edit Hyperlink'
                                                : 'Add Hyperlink'}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {isEditing
                                                ? 'Edit the hyperlink'
                                                : 'Add a new hyperlink'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <HyperlinkForm className="w-full" />
                                </DialogContent>
                            </Dialog>
                            <Dialog
                                open={isModalOpen}
                                onOpenChange={(open) => {
                                    setIsModalOpen(open);
                                    if (!open) {
                                        setIsEditing(false);
                                        setEditingAppId(null);
                                        form.reset();
                                    }
                                }}
                            >
                                <DialogTrigger
                                    onClick={() => setIsModalOpen(true)}
                                    className="rounded-full bg-primary p-2 text-white shadow-lg hover:cursor-pointer hover:bg-primary/90"
                                >
                                    <ScreenShare className="size-4" />
                                </DialogTrigger>
                                <DialogContent className="rounded">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-start gap-2">
                                            <Link className="size-3" />
                                            {isEditing ? 'Edit App' : 'Add App'}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {isEditing
                                                ? 'Edit the app'
                                                : 'Add a new app'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <AppForm className="w-full" />
                                </DialogContent>
                            </Dialog>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="text-white">
                            <p>{'Create new hyperlink'}</p>
                            <TooltipArrow className="fill-primary dark:fill-primary" />
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild data-state="instant-open">
                            <a
                                className="rounded-full bg-primary p-3 text-white shadow-lg hover:cursor-pointer hover:bg-primary/90"
                                href="#"
                            >
                                <LinkIcon className="size-4" />
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="text-white">
                            <p>{'Create new hyperlink'}</p>
                            <TooltipArrow className="fill-primary dark:fill-primary" />
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Haupt-Button */}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild data-state="instant-open">
                        <button
                            aria-label={'Create new content'}
                            aria-label={'Create new content'}
                            onClick={() => setShowCircularMenu((prev) => !prev)}
                            className="rounded-full bg-primary p-4 text-lg text-white shadow-lg transition hover:cursor-pointer hover:bg-primary/90"
                            className="rounded-full bg-primary p-4 text-lg text-white shadow-lg transition hover:cursor-pointer hover:bg-primary/90"
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
                        className="bg-primary text-white"
                    >
                        <p>{'Create new content'}</p>
                        <TooltipArrow className="fill-primary" />
                    <TooltipContent
                        side="left"
                        className="bg-primary text-white"
                    >
                        <p>{'Create new content'}</p>
                        <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default CircularMenu;
