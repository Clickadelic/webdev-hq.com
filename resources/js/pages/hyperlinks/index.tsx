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
    // Expose a quick debug flag to verify the correct bundle is loaded
    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.__HYPERLINKS_DEBUG__ = {
            builtAt: new Date().toISOString(),
        };
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-md border border-yellow-300 bg-yellow-50 p-2 text-xs text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-200">
                    Debug: Hyperlinks page loaded at {new Date().toLocaleTimeString()}
                </div>
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
                                            type="text"
                                            placeholder="https://example.com (include http/https)"
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">Include http:// or https://</p>
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

                                    <div className="flex items-center justify-between">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => {
                                                console.log('Debug: clicked test submit button');
                                                router.post('/hyperlinks', {
                                                    title: 'Test link',
                                                    url: 'https://example.com',
                                                    description: 'Debug submit',
                                                    status: 'published',
                                                }, {
                                                    preserveScroll: true,
                                                    onStart: () => console.log('Debug: request start'),
                                                    onError: (e) => console.log('Debug: request error', e),
                                                    onSuccess: () => console.log('Debug: request success'),
                                                    onFinish: () => console.log('Debug: request finished'),
                                                });
                                            }}
                                        >
                                            Debug Submit
                                        </Button>

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
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <h1>Bla</h1>
                </div>
            </div>
        </AppLayout>
    );
}
