import { useEffect } from "react";
import { router, useForm } from "@inertiajs/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LoaderCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BsPlusLg } from "react-icons/bs";

import { store, update } from "@/actions/App/Http/Controllers/AppController";
import { type App } from "@/types";

import { cn } from "@/lib/utils";

interface AppFormProps {
    app?: App;
    className?: string;
}

export default function AppForm({ app, className }: AppFormProps) {
    // Inertia's useForm Hook
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: app?.title ?? "",
        url: app?.url ?? "",
        target: (app?.target ?? "_blank") as "_blank" | "_self",
    });

    useEffect(() => {
        if (app) {
            setData({
                title: app.title,
                url: app.url,
                target: app.target as "_blank" | "_self",
            });
        } else {
            setData({ title: "", url: "", target: "_blank" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [app?.id]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (app) {
            put(update.url(app.id), {
                preserveScroll: true,
                onSuccess: () => toast.success("App updated!"),
                onError: () => toast.error("App update failed!"),
            });
            return;
        }

        post(store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success("App created!");
            },
            onError: () => toast.error("App creation failed!"),
        });
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4", className)}>
            {/* Title */}
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    required
                    placeholder="Title"
                    onChange={e => setData("title", e.target.value)}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            {/* URL */}
            <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                    id="url"
                    value={data.url}
                    required
                    placeholder="https://example.com"
                    onChange={e => setData("url", e.target.value)}
                />
                {errors.url && <p className="text-sm text-destructive">{errors.url}</p>}
            </div>

            {/* Target */}
            <div className="grid gap-2">
                <Label>Target</Label>
                <ToggleGroup
                    size="sm"
                    variant="outline"
                    type="single"
                    value={data.target}
                    onValueChange={(value) => setData("target", (value as "_blank" | "_self") ?? "_blank")}
                >
                    <ToggleGroupItem value="_self">_self</ToggleGroupItem>
                    <ToggleGroupItem value="_blank">_blank</ToggleGroupItem>
                </ToggleGroup>

                {errors.target && <p className="text-sm text-destructive">{errors.target}</p>}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? <LoaderCircle /> : <BsPlusLg size={8} className="mr-2" />}
                {processing ? "Loading" : app ? "Save Changes" : "Add App"}
            </Button>
        </form>
    );
}
