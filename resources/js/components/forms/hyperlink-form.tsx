import { useForm } from "@inertiajs/react";
import { store } from "@/actions/App/Http/Controllers/HyperlinkController";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { toast } from "sonner"

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
                <Label htmlFor="title">Titel</Label>
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

            {/* Status (Select) */}
            <div className="grid gap-2">
                <Label>Status</Label>
                <Select 
                    value={data.status} 
                    onValueChange={(value) => setData("status", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Status wählen" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? "Loading" : "Save Hyperlink"}
            </Button>
        </form>
    );
}