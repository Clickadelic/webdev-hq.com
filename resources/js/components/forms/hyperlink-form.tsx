import {
    store,
    update,
} from '@/actions/App/Http/Controllers/HyperlinkController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useForm } from '@inertiajs/react';
import { LoaderCircle, LucideLink } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { type Hyperlink } from '@/types';
import { CategoryComboBox } from './category-combobox';
import { TagComboBox } from './tag-combobox';

interface HyperlinkFormProps {
    hyperlink?: Hyperlink;
    className?: string;
    onSuccess?: () => void;
}

export default function HyperlinkForm({
    hyperlink,
    className,
    onSuccess,
}: HyperlinkFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: hyperlink?.title ?? '',
        url: hyperlink?.url ?? '',
        description: hyperlink?.description ?? '',
        category: hyperlink?.category_id ? String(hyperlink.category_id) : '',
        status: hyperlink?.status ?? 'published',
        tags: (hyperlink?.tags ?? []).map((t) => String(t.id)) as string[],
    });

    useEffect(() => {
        if (hyperlink) {
            setData({
                title: hyperlink.title,
                url: hyperlink.url,
                description: hyperlink.description ?? '',
                category: hyperlink.category_id
                    ? String(hyperlink.category_id)
                    : '',
                status: hyperlink.status,
                tags: (hyperlink.tags ?? []).map((t) => String(t.id)),
            });
        } else {
            setData({
                title: '',
                url: '',
                description: '',
                category: '',
                status: 'published',
                tags: [],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hyperlink?.id]);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (hyperlink) {
            put(update.url(hyperlink.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onSuccess?.();
                    toast.success('Hyperlink updated!');
                },
                onError: () => toast.error('Hyperlink update failed!'),
            });
            return;
        }

        post(store.url(), {
            onSuccess: () => {
                reset();
                onSuccess?.();
                toast.success('Hyperlink created!');
            },
            onError: () => toast.error('Hyperlink creation failed!'),
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('flex flex-col gap-4', className)}
        >
            {/* Title */}
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    required
                    placeholder="Title"
                    onChange={(e) => setData('title', e.target.value)}
                />
                {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                )}
            </div>

            {/* Category */}
            <div className="grid gap-2">
                <Label>Category</Label>
                <CategoryComboBox
                    value={data.category}
                    onChange={(value) => setData('category', value)}
                />
                {errors.category && (
                    <p className="text-sm text-destructive">
                        {errors.category}
                    </p>
                )}
            </div>

            {/* URL */}
            <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                    id="url"
                    value={data.url}
                    required
                    placeholder="https://example.com"
                    onChange={(e) => setData('url', e.target.value)}
                />
                {errors.url && (
                    <p className="text-sm text-destructive">{errors.url}</p>
                )}
            </div>

            {/* Description */}
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Tags */}
            <div className="grid gap-2">
                <Label>Tags</Label>
                <TagComboBox
                    value={data.tags}
                    onChange={(value) => setData('tags', value)}
                />
                {errors.tags && (
                    <p className="text-sm text-destructive">{errors.tags}</p>
                )}
            </div>

            {/* Status */}
            <div className="grid gap-2">
                <Label>Status</Label>
                <ToggleGroup
                    size="sm"
                    variant="outline"
                    type="single"
                    value={data.status}
                    onValueChange={(value) => {
                        if (value) setData('status', value);
                    }}
                >
                    <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
                    <ToggleGroupItem value="published">
                        Published
                    </ToggleGroupItem>
                    <ToggleGroupItem value="archived">Archived</ToggleGroupItem>
                </ToggleGroup>
                {errors.status && (
                    <p className="text-sm text-destructive">{errors.status}</p>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? (
                    <LoaderCircle />
                ) : (
                    <LucideLink size={8} className="mr-2" />
                )}
                {processing
                    ? 'Loading'
                    : hyperlink
                      ? 'Save Changes'
                      : 'Save Hyperlink'}
            </Button>
        </form>
    );
}
