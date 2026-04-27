import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { BsPlusLg } from 'react-icons/bs';
import { toast } from 'sonner';

import { store, update } from '@/actions/App/Http/Controllers/AppController';
import { type Category } from '@/types';

import { cn } from '@/lib/utils';

interface CategoryFormProps {
    category?: Category;
    className?: string;
}

export default function CategoryForm({
    category,
    className,
}: CategoryFormProps) {
    // Inertia's useForm Hook
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: category?.name ?? '',
        slug: category?.slug ?? '',
        created_at: category?.created_at ?? '',
        updated_at: category?.updated_at ?? '',
    });

    useEffect(() => {
        if (category) {
            setData({
                name: category.name,
                slug: category.slug,
                created_at: category.created_at,
                updated_at: category.updated_at,
            });
        } else {
            setData({ name: '', slug: '', created_at: '', updated_at: '' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category?.id]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (category) {
            put(update.url(category.name), {
                preserveScroll: true,
                onSuccess: () => toast.success('Category updated!'),
                onError: () => toast.error('Category update failed!'),
            });
            return;
        }

        post(store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Category created!');
            },
            onError: () => toast.error('Category creation failed!'),
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('flex flex-col gap-4', className)}
        >
            {/* Name */}
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    required
                    placeholder="Name"
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                )}
            </div>

            {/* Slug */}
            <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    value={data.slug}
                    required
                    placeholder="slug"
                    onChange={(e) => setData('slug', e.target.value)}
                />
                {errors.slug && (
                    <p className="text-sm text-destructive">{errors.slug}</p>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? (
                    <LoaderCircle />
                ) : (
                    <BsPlusLg size={8} className="mr-2" />
                )}
                {processing
                    ? 'Loading'
                    : category
                      ? 'Save Changes'
                      : 'Add Category'}
            </Button>
        </form>
    );
}
