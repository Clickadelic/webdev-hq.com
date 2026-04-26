import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export interface SortableAppTileProps {
    app: {
        id: string;
        title: string;
        url: string;
        icon: string;
    };
    enabled?: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    wasDragged: boolean;
    setWasDragged: (val: boolean) => void;
}

export const SortableAppTile = ({
    app,
    onEdit,
    onDelete,
    enabled = true,
}: SortableAppTileProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: app.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            key={app.id}
            className="relative z-10 size-[70px] rounded border bg-white pt-1 transition-colors duration-150 ease-in-out hover:cursor-pointer dark:bg-neutral-800"
        >
            <div
                className={
                    'drag-handle absolute top-[4px] left-[24px] z-100 inline-flex h-[5px] w-[20px] rounded bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 ' +
                    (enabled
                        ? 'hover:cursor-move'
                        : 'cursor-not-allowed opacity-50')
                }
                {...(enabled ? listeners : {})}
                {...(enabled ? attributes : {})}
            />
            <a
                href={app.url}
                target="_self"
                className="flex flex-col items-center justify-between gap-2 p-2"
                rel="noopener noreferrer"
            >
                <img
                    src={app.icon}
                    alt={app.title}
                    className="size-6 rounded-xs"
                />
                <span className="inline-block max-w-[56px] truncate text-xs text-neutral-800 dark:text-neutral-300">
                    {app.title}
                </span>
            </a>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <button className="absolute top-1 right-px z-50 rounded-xs text-neutral-600 hover:cursor-pointer hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-600">
                        <HiOutlineDotsVertical className="size-4" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    side="right"
                    align="start"
                    className="rounded"
                >
                    <DropdownMenuItem>
                        <button
                            onClick={() => onEdit(app.id)}
                            className="flex justify-between rounded"
                        >
                            <AiOutlineEdit className="mt-1 mr-2" />
                            Edit
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button
                            onClick={() => onDelete(app.id)}
                            className="flex justify-between rounded text-red-500 hover:text-red-700"
                        >
                            <BsTrash className="mt-1 mr-2 size-3 text-red-500 hover:text-red-700" />
                            Delete
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    );
};
