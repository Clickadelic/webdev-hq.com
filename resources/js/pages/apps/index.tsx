'use client';

import { index } from '@/actions/App/Http/Controllers/AppController';
import AppForm from '@/components/forms/app-form';
import AppLayout from '@/layouts/app-layout';
import { App, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Apps',
        href: index.url(),
    },
];

export default function Apps() {
    const { apps } = usePage<{ apps: { data: App[] } }>().props;
    const items = apps.data;

    console.log('Items are', items);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-8 p-4">
                {/* Sektion 1: Das Formular (oben oder in der Sidebar) */}
                <div className="max-w-2xl">
                    <h2 className="mb-4 text-lg font-medium">Add an App </h2>
                    <AppForm className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900" />
                </div>

                <hr className="border-sidebar-border" />

                {/* Sektion 2: Die Liste der Items */}
                <div>
                    <h2 className="mb-4 text-lg font-medium">
                        Deine Ressourcen
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items && items.length > 0 ? (
                            items.map((link: App) => (
                                <div
                                    key={link.id}
                                    className="flex flex-col gap-2 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900"
                                >
                                    <div className="flex items-start justify-between">
                                        <h3 className="truncate pr-2 text-lg leading-tight font-semibold">
                                            {link.title}
                                        </h3>
                                        <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary uppercase">
                                            {link.target}
                                        </span>
                                    </div>

                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 truncate text-sm font-medium text-primary underline-offset-4 hover:underline"
                                    >
                                        {link.url.replace(/^https?:\/\//, '')}
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground italic">
                                Noch keine Links vorhanden.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
