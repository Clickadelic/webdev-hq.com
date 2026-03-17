
import AppLayout from '@/layouts/app-layout';
import { SortableAppTile } from '@/components/sortable-app-tile';
import { useState, useEffect } from "react"

import type { DragEndEvent } from "@dnd-kit/core"
import type { DragStartEvent } from '@dnd-kit/core'

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core"
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { BsApp } from "react-icons/bs"
import { TbEdit } from "react-icons/tb"

// import { useAppStore, AppType } from "@/stores/use-app-store"

import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

import AppForm from '@/components/forms/app-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const apps = [
    {
        id: 1,
        name: 'App 1',
        icon: <BsApp />
    },
    {
        id: 2,
        name: 'App 2',
        icon: <BsApp />
    },
    {
        id: 3,
        name: 'App 3',
        icon: <BsApp />
    },
]

export default function Dashboard() {

    // const { apps, addApp, editApp, removeApp } = useAppStore()
	// const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	// const [isLoading, setIsLoading] = useState<boolean>(false)
	// const [isEditing, setIsEditing] = useState<boolean>(false)
	// const [editingAppId, setEditingAppId] = useState<string | null>(null)
	// const [error, setError] = useState<string | undefined>("")
	// const [success, setSuccess] = useState<string | undefined>("")
	// const [draggingApp, setDraggingApp] = useState<AppType | null>(null)
	
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8, // minimale Bewegung zum Starten von Drag (z.B. um Klick vs. Drag zu unterscheiden)
			},
		})
	)

	const handleDragStart = (event: DragStartEvent) => {
		alert("Handledragstart")
	}

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		alert("Handledragend")
	}


	const onAddSubmit = () => {
		alert("onAddSubmit")
	}

	const onDelete = (id: string) => {
		alert("onDelete " + id)
	}

	const onEdit = (id: string) => {
		alert("onEdit " + id)
	}

	const onEditSubmit = () => {
		alert("onEditSubmit")
	}

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingAppId, setEditingAppId] = useState<string | null>(null)
    const draggingApp = null

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                    <SortableContext items={apps.map(app => app.id)} strategy={horizontalListSortingStrategy}>
                        <ul className="w-full grid grid-cols-12 gap-1 p-1 bg-white/30 dark:bg-slate-800/30 rounded backdrop-blur">
                            {apps.map(app => (
                                <SortableAppTile
                                    key={app.id}
                                    app={app}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    wasDragged={isEditing}
                                    
                                    setWasDragged={setIsEditing}
                                />
                            ))}
                            <li>
                                <Dialog
                                    open={isModalOpen}
                                    onOpenChange={open => {
                                        setIsModalOpen(open)
                                        if (!open) {
                                            setIsEditing(false)
                                            setEditingAppId(null)
                                            
                                        }
                                    }}
                                >
                                    <DialogTrigger
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex flex-col gap-1 items-center place-content-center text-slate-400 dark:text-slate-300 bg-white dark:bg-slate-800 p-2 size-[70px] rounded border-1 transition-colors duration-150 ease-in-out border-transparent hover:border-mantis-primary hover:text-mantis-primary hover:cursor-pointer"
                                    >
                                        <Plus />
                                    </DialogTrigger>
                                    <DialogContent className="rounded">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-start gap-2">
                                                <BsApp />
                                                Edit App
                                            </DialogTitle>
                                            <DialogDescription>
                                                Add a new app to your list.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex">
                                            <AppForm className="w-full" />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </li>
                        </ul>
                    </SortableContext>
                    <DragOverlay zIndex={50}>
                        {draggingApp ? (
                            <div className="size-[70px] bg-white dark:bg-slate-800 pt-1 rounded border border-mantis-primary shadow-lg p-2 flex flex-col items-center justify-between">
                                <img src={draggingApp.icon} alt={draggingApp.title} className="size-6 rounded-xs" />
                                <span className="text-slate-800 dark:text-slate-300 text-xs truncate max-w-[56px]">{draggingApp.title}</span>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
                
            </div>
        </AppLayout>
    );
}