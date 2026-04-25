'use client';

import { index } from '@/actions/App/Http/Controllers/HyperlinkController';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import AppLayout from '@/layouts/app-layout';
import { Hyperlink, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

import DeleteHyperlinkButton from '@/components/hyperlinks/delete-hyperlink-button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hyperlinks',
        href: index.url(),
    },
];

export default function Hyperlinks() {
    const { hyperlinks } = usePage<{ hyperlinks: { data: Hyperlink[] } }>()
        .props;
    const items = hyperlinks.data;

    console.log('Items are', items);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-8 p-4">
                {/* Sektion 1: Das Formular (oben oder in der Sidebar) */}
                <div className="max-w-2xl">
                    <h2 className="mb-4 text-lg font-medium">
                        Add a Hyperlink{' '}
                    </h2>
                    <HyperlinkForm className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900" />
                </div>

                <hr className="border-sidebar-border" />

                {/* Sektion 2: Die Liste der Items */}
                <div>
                    <h2 className="mb-4 text-lg font-medium">
                        Deine Ressourcen
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items && items.length > 0 ? (
                            items.map((link: Hyperlink) => (
                                <div
                                    key={link.id}
                                    className="flex flex-col gap-2 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:border-primary/50 dark:bg-neutral-900"
                                >
                                    <div className="flex items-start justify-between">
                                        <h3 className="truncate pr-2 text-lg leading-tight font-semibold">
                                            {link.title}
                                        </h3>
                                        <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary uppercase">
                                            {link.status}
                                        </span>
                                    </div>

                                    <p className="line-clamp-2 flex-1 font-mono text-sm text-muted-foreground italic">
                                        {link.description ||
                                            'Keine Beschreibung.'}
                                    </p>

                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 truncate text-sm font-medium text-primary underline-offset-4 hover:underline"
                                    >
                                        {link.url.replace(/^https?:\/\//, '')}
                                    </a>
                                    <DeleteHyperlinkButton id={link.id} />
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
