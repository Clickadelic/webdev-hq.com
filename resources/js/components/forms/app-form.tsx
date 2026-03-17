import { useForm } from "@inertiajs/react";
import { store } from "@/actions/App/Http/Controllers/HyperlinkController";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { LoaderCircle, LucideLink } from 'lucide-react';

import { cn } from "@/lib/utils";

interface HyperlinkFormProps {
    className?: string;
}

export default function HyperlinkForm({ className }: HyperlinkFormProps) {
    // Inertia's useForm Hook
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        url: "",
        description: "",
        status: "published",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Wir senden die Daten an die Wayfinder-Route
        post(store.url(), {
            onSuccess: () => {
                reset()
                toast.success("Hyperlink created!")
            },
            onError: () => {
                toast.error("Hyperlink creation failed!")
            }
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

            {/* Description */}
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={e => setData("description", e.target.value)}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? <LoaderCircle /> : <LucideLink size={8} className="mr-2" />}
                {processing ? "Loading" : "Save Hyperlink"}
            </Button>
        </form>
    );
}