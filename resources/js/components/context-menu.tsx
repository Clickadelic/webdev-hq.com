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
// import { usePermissions } from '@/hooks/usePermissions';
// import { Recipe } from '@/types/Recipe';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { GoTrash } from 'react-icons/go';
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from 'react-icons/hi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { PiCopySimpleLight } from 'react-icons/pi';
import { RxClipboardCopy } from 'react-icons/rx';

// import { SharedPageProps } from '@/types';

import { cn } from '@/lib/utils';

interface RecipeContextMenuProps {
    // recipe?: Recipe | null;
    className?: string;
    dotStyle?: 'vertical' | 'horizontal';
}

/**
 * A context menu for recipes, allowing users to edit or delete the recipe.
 * The menu is displayed when the user clicks on the three vertical dots in the top right corner of the recipe card.
 * If the user clicks on the "Löschen" button, a confirmation dialog is displayed, asking the user if they are sure they want to delete the recipe.
 * If the user clicks on the "Bearbeiten" button, the edit recipe page is opened.
 * @param {RecipeContextMenuProps} props - The props for the context menu.
 * @param {Recipe} props.recipe - The recipe to be edited or deleted.
 * @returns {JSX.Element} - The JSX element for the context menu.
 */
export default function RecipeContextMenu({
    // recipe,
    className,
    dotStyle = 'vertical',
}: RecipeContextMenuProps) {
    // const { isOwner } = usePermissions();
    // const { props } = usePage<SharedPageProps>();

    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [isSocialShareOpen, setIsSocialShareOpen] = useState<boolean>(false);

    const toggleCopyDialog = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAlertOpen((prev) => !prev);
    };

    const toggleSocialShareDialog = (e: React.MouseEvent) => {
        setIsSocialShareOpen((prev) => !prev);
        e.stopPropagation();
    };

    const deleteRecipe = (e: React.MouseEvent) => {
        e.stopPropagation();
        // router.delete(route('recipes.destroy', recipe?.slug));
    };

    // Improve copy to clipboard
    // TODO: get current url savely, not twice in HTML and JS
    // const copyToClipboard = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    //     navigator.clipboard.writeText(
    //         window.location.origin + '/rezepte/' + recipe?.slug,
    //     );
    //     toast.success('Link kopiert', {
    //         duration: 3000,
    //     });
    // };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    'z-20 rounded-full border border-transparent p-1 text-gray-600 shadow-transparent hover:cursor-pointer hover:border-primary hover:bg-white/30 hover:text-primary focus:text-primary focus:ring focus:ring-primary focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800/30',
                    className,
                )}
                onClick={(e) => e.stopPropagation()}
                aria-label="Rezept Optionen"
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
                    <DropdownMenuItem>
                        <Link
                            // href={route('recipes.edit', recipe?.slug)}
                            href="#"
                            className="flex w-full flex-row items-center hover:text-gray-800 dark:hover:text-gray-400"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MdOutlineEdit className="mr-2 size-5" />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <AlertDialog>
                            <AlertDialogTrigger
                                className="items-between flex w-full flex-row gap-2 hover:cursor-pointer hover:text-gray-800 dark:hover:text-gray-400"
                                onClick={toggleCopyDialog}
                            >
                                <PiCopySimpleLight className="size-5" />
                                <span>Copy</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-100 dark:bg-gray-900">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-gray-800 dark:text-gray-200">
                                        Bist Du sicher, dass Du das Rezept{' '}
                                        <span className="font-bold">
                                            Linkname
                                        </span>{' '}
                                        kopieren möchtest?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Die Kopie wird als Entwurf gespeichert!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className="dark:text-gray-200"
                                        onClick={toggleCopyDialog}
                                    >
                                        Abbrechen
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-primary text-white hover:bg-emerald-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // router.post(
                                            //     route(
                                            //         'recipes.duplicate',
                                            //         recipe?.slug,
                                            //     ),
                                            //     {},
                                            //     {
                                            //         onSuccess: () => {
                                            //             toast.success(
                                            //                 'Rezept wurde kopiert! Siehe Dashboard.',
                                            //                 {
                                            //                     duration: 3000,
                                            //                 },
                                            //             );
                                            //         },
                                            //         onError: () => {
                                            //             toast.error(
                                            //                 'Fehler beim Kopieren',
                                            //             );
                                            //         },
                                            //     },
                                            // );
                                        }}
                                    >
                                        <PiCopySimpleLight className="size-5" />
                                        Copy
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger
                                className="items-between flex w-full flex-row gap-2 text-rose-600 hover:cursor-pointer hover:text-rose-700"
                                onClick={toggleCopyDialog}
                            >
                                <GoTrash className="mt-px ml-0.5 size-4 text-rose-600" />
                                <span>Delete</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-100 dark:bg-gray-900">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-gray-800 dark:text-gray-200">
                                        Are you sure you want to delete this
                                        item? This action cannot be undone.
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Dies kann nicht rückgängig gemacht
                                        werden!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className="dark:text-gray-200"
                                        onClick={toggleCopyDialog}
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-rose-700 text-white hover:bg-rose-500"
                                        onClick={deleteRecipe}
                                    >
                                        <GoTrash className="size-5" />
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger
                                className="items-between flex w-full flex-row gap-2 hover:cursor-pointer"
                                onClick={toggleSocialShareDialog}
                            >
                                <IoShareSocialOutline className="size-5" />
                                <span>Share</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-100 dark:bg-gray-900">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-gray-800 dark:text-gray-200">
                                        Cool, dass Du{' '}
                                        <span className="font-bold">
                                            Hyperlink Name
                                        </span>{' '}
                                        teilen möchtest, hier der Link:
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="mb-3">
                                        <span id="recipe-link">
                                            <a
                                                href="https://rezeptbuch.tobias-hopp.de/rezepte/`${recipe?.slug}`"
                                                className="underline-offset-4 hover:underline"
                                                title="Link öffnen"
                                            >
                                                https://rezeptbuch.tobias-hopp.de/rezepte/
                                                SLUG
                                            </a>
                                        </span>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className="dark:text-gray-200"
                                        onClick={toggleSocialShareDialog}
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="border border-primary bg-primary text-white hover:bg-emerald-700 hover:text-white"
                                        // onClick={return toggleCopyDialog}
                                    >
                                        <RxClipboardCopy className="size-5" />
                                        Copy hyperlink
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
