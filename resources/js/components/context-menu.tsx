import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Hyperlink } from '@/types';
import { GoTrash } from 'react-icons/go';
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from 'react-icons/hi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { RxClipboardCopy } from 'react-icons/rx';

import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ContextMenuProps {
    item?: Hyperlink | null;
    className?: string;
    dotStyle?: 'vertical' | 'horizontal';
    onEdit?: (hyperlink: Hyperlink) => void;
    onDelete?: (id: number) => void;
}

export default function ContextMenu({
    item,
    className,
    dotStyle = 'vertical',
    onEdit,
    onDelete,
}: ContextMenuProps) {
    function handleCopyUrl(e: React.MouseEvent) {
        e.stopPropagation();
        if (item?.url) {
            navigator.clipboard.writeText(item.url);
            toast.success('URL copied to clipboard!');
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    'z-20 rounded-full border border-transparent p-1 text-gray-600 shadow-transparent hover:cursor-pointer hover:border-primary hover:bg-white/30 hover:text-primary focus:text-primary focus:ring focus:ring-primary focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800/30',
                    className,
                )}
                onClick={(e) => e.stopPropagation()}
                aria-label="Options"
            >
                {dotStyle === 'vertical' ? (
                    <HiOutlineDotsVertical className="size-5" />
                ) : (
                    <HiOutlineDotsHorizontal className="size-5" />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="backdrop rounded-xl border-0 bg-white/30 p-1 backdrop-blur dark:bg-gray-800/30"
            >
                <div className="rounded-lg bg-white p-1 dark:bg-gray-800">
                    {onEdit && item && (
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(item);
                            }}
                            className="flex w-full flex-row items-center hover:cursor-pointer"
                        >
                            <MdOutlineEdit className="mr-2 size-5" />
                            Edit
                        </DropdownMenuItem>
                    )}

                    {onDelete && item && (
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger
                                    className="flex w-full flex-row items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-rose-600 hover:cursor-pointer hover:bg-accent hover:text-rose-700"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <GoTrash className="size-4" />
                                    <span>Delete</span>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-gray-100 dark:bg-gray-900">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-gray-800 dark:text-gray-200">
                                            Are you sure you want to delete this
                                            item? This action cannot be undone.
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="dark:text-gray-200">
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-rose-700 text-white hover:bg-rose-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(item.id);
                                            }}
                                        >
                                            <GoTrash className="size-5" />
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    )}

                    {(onEdit || onDelete) && <DropdownMenuSeparator />}

                    <DropdownMenuItem
                        onClick={handleCopyUrl}
                        className="flex w-full flex-row items-center gap-2 hover:cursor-pointer"
                    >
                        <RxClipboardCopy className="size-4" />
                        Copy URL
                    </DropdownMenuItem>

                    {item?.url && (
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(item.url, '_blank');
                            }}
                            className="flex w-full flex-row items-center gap-2 hover:cursor-pointer"
                        >
                            <IoShareSocialOutline className="size-4" />
                            Open in new tab
                        </DropdownMenuItem>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
