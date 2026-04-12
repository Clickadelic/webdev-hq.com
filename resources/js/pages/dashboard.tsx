import { SortableAppTile } from '@/components/sortable-app-tile';
import AppLayout from '@/layouts/app-layout';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

import {
    DndContext,
    DragOverlay,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Switch from '@/components/ui/switch';
import { Plus } from 'lucide-react';
import { BsApp } from 'react-icons/bs';

import { destroy as destroyRoute } from '@/actions/App/Http/Controllers/AppController';
import { dashboard } from '@/routes';
import { type App, type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import AppForm from '@/components/forms/app-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

function faviconFor(url: string): string {
    try {
        const u = new URL(url);
        return `${u.origin}/favicon.ico`;
    } catch {
        return '/favicon.ico';
    }
}

export default function Dashboard() {
    const { apps } = usePage<{ apps: App[] }>().props;

    const [items, setItems] = useState<
        { id: string; title: string; url: string; icon: string }[]
    >(
        (apps ?? []).map((a) => ({
            id: a.id,
            title: a.title,
            url: a.url,
            icon: faviconFor(a.url),
        })),
    );

    // Keep local items in sync when server-provided apps change (e.g., after create/delete)
    useEffect(() => {
        setItems(
            (apps ?? []).map((a) => ({
                id: a.id,
                title: a.title,
                url: a.url,
                icon: faviconFor(a.url),
            })),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apps?.length]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const handleDragStart = (_event: DragStartEvent) => {
        // Will implement reordering later
        console.log(_event + ' Drag started');
    };

    // Debounced persistence
    const persistTimer = useRef<number | null>(null);

    const debouncedPersist = useCallback(
        (order: string[], revert: () => void) => {
            if (persistTimer.current) window.clearTimeout(persistTimer.current);
            persistTimer.current = window.setTimeout(() => {
                router.patch(
                    '/apps/reorder',
                    { order },
                    {
                        preserveScroll: true,
                        onError: () => {
                            revert();
                            toast.error(
                                'Failed to save order. Changes were reverted.',
                            );
                        },
                    },
                );
            }, 400);
        },
        [],
    );

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!dragEnabled) return;
        if (!over || active.id === over.id) return;
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        const prev = items;
        const next = arrayMove(items, oldIndex, newIndex);
        setItems(next);

        // Persist new order (positions are assigned by index)
        debouncedPersist(
            next.map((i) => i.id),
            () => setItems(prev),
        );
    };

    const draggingApp = null; // We can use this to style the drag overlay if we want
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [dragEnabled, setDragEnabled] = useState<boolean>(false);

    const [editingAppId, setEditingAppId] = useState<string | null>(null);
    const editingApp = useMemo(
        () => apps?.find((a) => a.id === editingAppId) ?? null,
        [apps, editingAppId],
    );

    const onDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this app?')) {
            router.delete(destroyRoute.url(id), { preserveScroll: true });
        }
    };

    const onEdit = (id: string) => {
        setEditingAppId(id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto rounded-xl p-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    <SortableContext
                        items={items.map((app) => app.id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <div className="flex items-center gap-3 px-1 py-2">
                            <Switch
                                checked={dragEnabled}
                                onCheckedChange={setDragEnabled}
                            />
                            <span className="text-sm text-muted-foreground">
                                Enable reordering
                            </span>
                        </div>
                        <ul className="flex w-full gap-2 rounded bg-white/30 p-1 backdrop-blur dark:bg-slate-800/30">
                            {items.map((app) => (
                                <SortableAppTile
                                    key={app.id}
                                    app={app}
                                    enabled={dragEnabled}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    wasDragged={isEditing}
                                    setWasDragged={setIsEditing}
                                />
                            ))}
                            <li>
                                <Dialog
                                    open={isModalOpen}
                                    onOpenChange={(open) => {
                                        setIsModalOpen(open);
                                        if (!open) {
                                            setIsEditing(false);
                                            setEditingAppId(null);
                                        }
                                    }}
                                >
                                    <DialogTrigger
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex size-[70px] flex-col place-content-center items-center gap-1 rounded border bg-white p-2 text-slate-400 transition-colors duration-150 ease-in-out hover:cursor-pointer hover:border-primary hover:text-primary dark:bg-slate-800 dark:text-slate-300"
                                    >
                                        <Plus />
                                    </DialogTrigger>
                                    <DialogContent className="rounded">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-start gap-2">
                                                <BsApp />
                                                {isEditing
                                                    ? 'Edit App'
                                                    : 'Add App'}
                                            </DialogTitle>
                                            <DialogDescription>
                                                {isEditing
                                                    ? 'Update this app'
                                                    : 'Add a new app to your Dashboard.'}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex w-full">
                                            <AppForm
                                                className="w-full"
                                                app={editingApp ?? undefined}
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </li>
                        </ul>
                    </SortableContext>
                    <DragOverlay zIndex={50}>
                        {draggingApp ? (
                            <div className="border-mantis-primary flex size-[70px] flex-col items-center justify-between rounded border bg-white p-2 pt-1 shadow-lg dark:bg-slate-800">
                                <img
                                    src={draggingApp.icon}
                                    alt={draggingApp.title}
                                    className="size-6 rounded-xs"
                                />
                                <span className="max-w-[56px] truncate text-xs text-slate-800 dark:text-slate-300">
                                    {draggingApp.title}
                                </span>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </AppLayout>
    );
}
