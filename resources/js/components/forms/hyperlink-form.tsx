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
import { Checkbox } from "@/components/ui/checkbox";
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
            is_featured: false,
            status: "published",
            ...defaultValues,
        },
    });

    function handleSubmit(values: HyperlinkFormValues) {
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
                                onValueChange={field.onChange}
                                defaultValue={field.value}
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

                {/* Featured */}
                <FormField
                    control={form.control}
                    name="is_featured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="cursor-pointer">
                                Hervorgehoben
                            </FormLabel>
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
