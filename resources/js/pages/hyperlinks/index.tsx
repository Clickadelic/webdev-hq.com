import HyperlinkController from "@/actions/App/Http/Controllers/HyperlinkController";
import { Form, router } from "@inertiajs/react";

import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hyperlinks',
        href: HyperlinkController.index.url(),
    },
];

export default function Hyperlinks() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl border bg-white p-4 dark:bg-neutral-900">
                        <Form
                            {...HyperlinkController.store.form()}
                            options={{ preserveScroll: true }}
                            resetOnSuccess
                            onStart={() => console.log('Submitting hyperlink...')}
                            onError={(e) => console.log('Submit error', e)}
                            onSuccess={() => console.log('Submit success')}
                            onFinish={() => console.log('Submit finished')}
                            className="flex flex-col gap-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            placeholder="Best link resource"
                                            required
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="url">URL</Label>
                                        <Input
                                            id="url"
                                            name="url"
                                            type="url"
                                            placeholder="https://example.com"
                                            required
                                        />

                                        <InputError message={errors.url} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Beschreibung</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Optionale Beschreibung"
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            name="status"
                                            className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue="published"
                                        >
                                            <option value="draft">Entwurf</option>
                                            <option value="published">Veröffentlicht</option>
                                            <option value="archived">Archiviert</option>
                                        </select>
                                        <InputError message={errors.status} />
                                    </div>

                                    <div className="flex items-center justify-end">

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            onClick={() => console.log('Primary submit clicked')}
                                        >
                                            Speichern
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h1>Bla</h1>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h1>Bla</h1>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
