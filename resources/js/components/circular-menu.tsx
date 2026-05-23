import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { BsApp } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

/**
 * A circular menu that appears on the bottom right of the screen when the user has the user role.
 * It contains buttons to create a new recipe and to view all ingredients.
 */
export function CircularMenu() {
    const { auth } = usePage<SharedData>().props;
    // States
    const [showCircularMenu, setShowCircularMenu] = useState<boolean>(false);
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    // const [editingAppId, setEditingAppId] = useState<string | null>(null);
    // const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // const [error, setError] = useState<string | undefined>(undefined);
    // const [success, setSuccess] = useState<string | undefined>(undefined);

    // const [isLoading, setIsLoading] = useState<boolean>(false);

    // const form = useForm<z.infer<typeof HyperlinkSchema>>({
    //     resolver: zodResolver(HyperlinkSchema),
    //     defaultValues: { title: '', url: '' },
    // });

    // const { handleSubmit } = form;

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
        <div className="fixed right-4 bottom-4 z-20 max-w-[48px] md:right-8 md:bottom-8 lg:right-12 lg:bottom-12">
            <div
                className={cn(
                    'absolute -top-24 left-1 flex flex-col items-center space-y-2 transition-all',
                    showCircularMenu
                        ? 'opacity-100'
                        : 'pointer-events-none opacity-0',
                )}
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild data-state="instant-open">
                            <Link
                                className="rounded-full bg-primary p-3 text-white shadow-lg hover:cursor-pointer"
                                href="#"
                            >
                                <BsApp />
                            </Link>
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
                            <p>New Hyperlink</p>
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
                            aria-label="Add new content"
                            onClick={() => setShowCircularMenu((prev) => !prev)}
                            className="rounded-full bg-primary p-4 text-lg text-white shadow-lg transition hover:cursor-pointer"
                        >
                            <FiPlus
                                className={cn(
                                    'transition-transform',
                                    showCircularMenu ? 'rotate-45' : '',
                                )}
                            />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="text-white">
                        <p>Add new content</p>
                        <TooltipArrow className="fill-primary dark:fill-primary" />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default CircularMenu;
