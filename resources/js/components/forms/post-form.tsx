import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LoaderCircle } from 'lucide-react';
import { BsPlusLg } from 'react-icons/bs';
import { toast } from 'sonner';

import { store, update } from '@/actions/App/Http/Controllers/PostController';
import { type Category, type Post, type Status, type Tag } from '@/types';

import { cn } from '@/lib/utils';

/** Hilfsfunktion zum Generieren von URL-freundlichen Slugs */
function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-');
}

interface PostFormProps {
    post?: Post;
    categories?: Category[];
    tags?: Tag[];
    className?: string;
}

export default function PostForm({
    post,
    categories = [],
    tags = [],
    className,
}: PostFormProps) {
    // Inertia's useForm Hook
    const {
        data,
        setData,
        post: sendPost,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        title: post?.title ?? '',
        subline: post?.subline ?? '',
        slug: post?.slug ?? '',
        description: post?.description ?? '',
        content: post?.content ?? '',
        featured_image: post?.featured_image ?? '',
        category_id: post?.category_id ?? '',
        status: (post?.status ?? 'draft') as Status,
        published_at: post?.published_at ? post.published_at.slice(0, 16) : '',
        meta_title: post?.meta_title ?? '',
        meta_description: post?.meta_description ?? '',
        tag_ids: post?.tags?.map((t) => t.id) ?? ([] as string[]),
    });

    useEffect(() => {
        if (post) {
            setData({
                title: post.title,
                subline: post.subline ?? '',
                slug: post.slug,
                description: post.description ?? '',
                content: post.content,
                featured_image: post.featured_image ?? '',
                category_id: post.category_id ?? '',
                status: post.status,
                published_at: post.published_at
                    ? post.published_at.slice(0, 16)
                    : '',
                meta_title: post.meta_title ?? '',
                meta_description: post.meta_description ?? '',
                tag_ids: post.tags?.map((t) => t.id) ?? [],
            });
        } else {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post?.id]);

    // Automatische Slug-Generierung aus dem Titel (nur bei neuem Post oder leerem Slug)
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setData((prev) => ({
            ...prev,
            title,
            slug: !post ? slugify(title) : prev.slug,
        }));
    };

    const handleTagToggle = (tagId: string) => {
        setData((prev) => ({
            ...prev,
            tag_ids: prev.tag_ids.includes(tagId)
                ? prev.tag_ids.filter((id) => id !== tagId)
                : [...prev.tag_ids, tagId],
        }));
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (post) {
            put(update.url(post.id), {
                preserveScroll: true,
                onSuccess: () => toast.success('Post updated!'),
                onError: () => toast.error('Post update failed!'),
            });
            return;
        }

        sendPost(store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Post created!');
            },
            onError: () => toast.error('Post creation failed!'),
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('flex w-full max-w-4xl flex-col gap-6', className)}
        >
            {/* Title & Slug */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={data.title}
                        required
                        placeholder="Mein neuer Blogpost"
                        onChange={handleTitleChange}
                    />
                    {errors.title && (
                        <p className="text-sm text-destructive">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={data.slug}
                        required
                        placeholder="mein-neuer-blogpost"
                        onChange={(e) =>
                            setData('slug', slugify(e.target.value))
                        }
                    />
                    {errors.slug && (
                        <p className="text-sm text-destructive">
                            {errors.slug}
                        </p>
                    )}
                </div>
            </div>

            {/* Subline */}
            <div className="grid gap-2">
                <Label htmlFor="subline">Subline</Label>
                <Input
                    id="subline"
                    value={data.subline}
                    placeholder="Eine kurze, knackige Unterüberschrift"
                    onChange={(e) => setData('subline', e.target.value)}
                />
                {errors.subline && (
                    <p className="text-sm text-destructive">{errors.subline}</p>
                )}
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select
                        value={data.category_id || 'none'}
                        onValueChange={(val) =>
                            setData('category_id', val === 'none' ? '' : val)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Kategorie wählen" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">
                                Keine Kategorie
                            </SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category_id && (
                        <p className="text-sm text-destructive">
                            {errors.category_id}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label>Status</Label>
                    <ToggleGroup
                        size="sm"
                        variant="outline"
                        type="single"
                        value={data.status}
                        onValueChange={(value) =>
                            value && setData('status', value as Status)
                        }
                    >
                        <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
                        <ToggleGroupItem value="published">
                            Published
                        </ToggleGroupItem>
                        <ToggleGroupItem value="archived">
                            Archived
                        </ToggleGroupItem>
                    </ToggleGroup>
                    {errors.status && (
                        <p className="text-sm text-destructive">
                            {errors.status}
                        </p>
                    )}
                </div>
            </div>

            {/* Tags Selection */}
            {tags.length > 0 && (
                <div className="grid gap-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => {
                            const isSelected = data.tag_ids.includes(tag.id);
                            return (
                                <Button
                                    key={tag.id}
                                    type="button"
                                    size="sm"
                                    variant={isSelected ? 'default' : 'outline'}
                                    onClick={() => handleTagToggle(tag.id)}
                                >
                                    {tag.name}
                                </Button>
                            );
                        })}
                    </div>
                    {errors.tag_ids && (
                        <p className="text-sm text-destructive">
                            {errors.tag_ids}
                        </p>
                    )}
                </div>
            )}

            {/* Published At & Featured Image */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="published_at">
                        Published At (Scheduled)
                    </Label>
                    <Input
                        id="published_at"
                        type="datetime-local"
                        value={data.published_at}
                        onChange={(e) =>
                            setData('published_at', e.target.value)
                        }
                    />
                    {errors.published_at && (
                        <p className="text-sm text-destructive">
                            {errors.published_at}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="featured_image">Featured Image URL</Label>
                    <Input
                        id="featured_image"
                        value={data.featured_image}
                        placeholder="https://... /image.jpg"
                        onChange={(e) =>
                            setData('featured_image', e.target.value)
                        }
                    />
                    {errors.featured_image && (
                        <p className="text-sm text-destructive">
                            {errors.featured_image}
                        </p>
                    )}
                </div>
            </div>

            {/* Description / Excerpt */}
            <div className="grid gap-2">
                <Label htmlFor="description">
                    Description (Excerpt / Teaser)
                </Label>
                <Textarea
                    id="description"
                    rows={3}
                    value={data.description}
                    placeholder="Kurze Zusammenfassung für Übersichten & OpenGraph Cards..."
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Content */}
            <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    rows={10}
                    required
                    value={data.content}
                    placeholder="Der Hauptinhalt deines Posts (Markdown / HTML)..."
                    onChange={(e) => setData('content', e.target.value)}
                />
                {errors.content && (
                    <p className="text-sm text-destructive">{errors.content}</p>
                )}
            </div>

            {/* SEO Section */}
            <div className="grid gap-4 border-t pt-4">
                <h3 className="text-sm font-semibold text-muted-foreground">
                    SEO Einstellungen
                </h3>

                <div className="grid gap-2">
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                        id="meta_title"
                        value={data.meta_title}
                        placeholder="Optionaler Titel für Suchmaschinen"
                        onChange={(e) => setData('meta_title', e.target.value)}
                    />
                    {errors.meta_title && (
                        <p className="text-sm text-destructive">
                            {errors.meta_title}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                        id="meta_description"
                        rows={2}
                        value={data.meta_description}
                        placeholder="Optionaler Meta-Text für Suchmaschinen..."
                        onChange={(e) =>
                            setData('meta_description', e.target.value)
                        }
                    />
                    {errors.meta_description && (
                        <p className="text-sm text-destructive">
                            {errors.meta_description}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={processing}
                className="w-full self-end md:w-auto"
            >
                {processing ? (
                    <LoaderCircle className="animate-spin" />
                ) : (
                    <BsPlusLg size={12} className="mr-2" />
                )}
                {processing
                    ? 'Saving...'
                    : post
                      ? 'Save Changes'
                      : 'Create Post'}
            </Button>
        </form>
    );
}
