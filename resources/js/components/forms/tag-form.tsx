import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { BsPlusLg } from 'react-icons/bs';
import { toast } from 'sonner';

import { store, update } from '@/actions/App/Http/Controllers/TagController';
import { type Tag } from '@/types';

import { cn } from '@/lib/utils';

interface TagFormProps {
    tag?: Tag;
    className?: string;
    onSuccess?: () => void;
}

export default function TagForm({ tag, className, onSuccess }: TagFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: tag?.name ?? '',
    });

    useEffect(() => {
        if (tag) {
            setData({ name: tag.name });
        } else {
            setData({ name: '' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tag?.id]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (tag) {
            put(update.url(tag.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onSuccess?.();
                    toast.success('Tag updated!');
                },
                onError: () => toast.error('Tag update failed!'),
            });
            return;
        }

        post(store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onSuccess?.();
                toast.success('Tag created!');
            },
            onError: () => toast.error('Tag creation failed!'),
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('flex flex-col gap-4', className)}
        >
            <div className="grid gap-2">
                <Label htmlFor="tag-name">Name</Label>
                <Input
                    id="tag-name"
                    value={data.name}
                    required
                    placeholder="Tag name"
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
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
                    : tag
                      ? 'Save Changes'
                      : 'Add Tag'}
            </Button>
        </form>
    );
}
