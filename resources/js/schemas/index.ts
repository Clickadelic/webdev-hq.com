import * as z from "zod";

export const HyperlinkSchema = z.object({ 
    id: z.string(),
    title: z.string(),
    url: z.url(),
    description: z.string(),
    category_id: z.string(),
    is_featured: z.boolean(),
    status: z.string(),
    created_by: z.string(),
    created_at: z.string(),
    updated_at: z.string()
});