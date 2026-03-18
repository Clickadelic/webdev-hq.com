import { useForm } from "@inertiajs/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { LoaderCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { BsPlusLg } from "react-icons/bs";

import { store } from "@/actions/App/Http/Controllers/AppController";

import { cn } from "@/lib/utils";

interface AppFormProps {
    className?: string;
}

export default function AppForm({ className }: AppFormProps) {
    // Inertia's useForm Hook
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        url: "",
        target: "_blank" as "_blank" | "_self",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(data);
        // Wir senden die Daten an die Wayfinder-Route
        // post(store.url(), {
        //     onSuccess: () => {
        //         reset()
        //         toast.success("App created!")
        //     },
        //     onError: () => {
        //         toast.error("App creation failed!")
        //     }
        // });
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

            {/* Status (Select) */}
            <div className="grid gap-2">
                <Label>Target</Label>
                <ToggleGroup size="sm" variant="outline" type="single" defaultValue="_blank" onValueChange={(value) => setData("target", value)} className="asd">
                    <ToggleGroupItem value="_self">_self</ToggleGroupItem>
                    <ToggleGroupItem value="_blank">_blank</ToggleGroupItem>
                </ToggleGroup>

                {errors.target && <p className="text-sm text-destructive">{errors.target}</p>}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? <LoaderCircle /> : <BsPlusLg size={8} className="mr-2" />}
                {processing ? "Loading" : "Add App"}
            </Button>
        </form>
    );
}