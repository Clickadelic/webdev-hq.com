import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { HyperlinkSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

type HyperlinkFormValues = z.infer<typeof HyperlinkSchema>;

interface HyperlinkFormProps {
    className?: string;
    defaultValues?: Partial<HyperlinkFormValues>;
    onSubmit?: (values: HyperlinkFormValues) => void;
}

function HyperlinkForm({
    className,
    defaultValues,
    onSubmit,
}: HyperlinkFormProps) {
    const form = useForm<HyperlinkFormValues>({
        resolver: zodResolver(HyperlinkSchema),
        defaultValues: {
            title: "",
            url: "",
            description: "",
            status: "published",
            ...defaultValues,
        },
    });
    function handleSubmit(values: HyperlinkFormValues) {
        // Hier rufen wir die Prop auf, die von der Parent-Seite kommt
        onSubmit?.(values);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={cn("flex flex-col gap-4", className)}
            >
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Best link resource" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* URL */}
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Beschreibung</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Optionale Beschreibung"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status wählen" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="draft">
                                        Entwurf
                                    </SelectItem>
                                    <SelectItem value="published">
                                        Veröffentlicht
                                    </SelectItem>
                                    <SelectItem value="archived">
                                        Archiviert
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <div className="flex justify-end">
                    <Button type="submit">
                        Speichern
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default HyperlinkForm;
