"use client";

import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Hyperlink } from '@/types';
import { toast } from "sonner"
import { index, destroy } from "@/actions/App/Http/Controllers/HyperlinkController";
import DeleteHyperlinkButton from "@/components/hyperlinks/delete-hyperlink-button";
interface Props {
    hyperlinks: Hyperlink[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hyperlinks',
        href: index.url(),
    },
];

export default function Hyperlinks() {
    const { hyperlinks } = usePage<{ hyperlinks: any }>().props;
    const items = hyperlinks.data;

    function handleDestroy({ id }: { id: number }) {
        if (confirm("Are you sure you want to delete this item?")) {
            router.delete(destroy.url(id));
            toast.success("Hyperlink deleted successfully.");
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-8 p-4">
                
                {/* Sektion 1: Das Formular (oben oder in der Sidebar) */}
                <div className="max-w-2xl">
                    <h2 className="text-lg font-medium mb-4">Add a Hyperlink </h2>
                    <HyperlinkForm className="border bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm" />
                </div>

                <hr className="border-sidebar-border" />

                {/* Sektion 2: Die Liste der Items */}
                <div>
                    <h2 className="text-lg font-medium mb-4">Deine Ressourcen</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items && items.length > 0 ? (
                            items.map((link: Hyperlink) => (
                                <div 
                                    key={link.id} 
                                    className="flex flex-col gap-2 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900"
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-lg leading-tight truncate pr-2">
                                            {link.title}
                                        </h3>
                                        <span className="text-[10px] uppercase px-2 py-1 rounded-md font-bold bg-primary/10 text-primary border border-primary/20">
                                            {link.status}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1 italic font-mono">
                                        {link.description || "Keine Beschreibung."}
                                    </p>

                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline underline-offset-4 truncate mt-2 font-medium"
                                    >
                                        {link.url.replace(/^https?:\/\//, '')}
                                    </a>
                                    <DeleteHyperlinkButton id={link.id} />
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground italic">Noch keine Links vorhanden.</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}