import * as z from "zod";

export const HyperlinkSchema = z.object({
    title: z.string().min(1, "Titel ist erforderlich"),
    url: z.string("Ungültige URL"),
    description: z.string().optional(),
    category_id: z.string().nullable().optional(),
    status: z.enum(["draft", "published", "archived"]),
});