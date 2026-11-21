import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { BsPlusLg } from 'react-icons/bs';
import { toast } from 'sonner';

import { store, update } from '@/actions/App/Http/Controllers/TagController';
import { type SharedData, type Tag } from '@/types';

import { cn } from '@/lib/utils';

interface TagFormProps {
    tag?: Tag;
    className?: string;
    onSuccess?: () => void;
}

export default function TagForm({ tag, className, onSuccess }: TagFormProps) {
    const availableTeams: SharedData['availableTeams'] = usePage<SharedData>().props.availableTeams;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: tag?.name ?? '',
        team_id: '',
    });

    useEffect(() => {
        if (tag) {
            setData({ name: tag.name, team_id: '' });
        } else {
            setData({ name: '', team_id: '' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tag?.id]);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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
        <form onSubmit={handleSubmit} className={cn('flex flex-col gap-4', className)}>
            <div className="grid gap-2">
                <Label htmlFor="tag-name">Name</Label>
                <Input id="tag-name" value={data.name} required placeholder="Tag name" onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            {!tag && (
                <div className="grid gap-2">
                    <Label htmlFor="tag-team">Team</Label>
                    <Select value={data.team_id} onValueChange={(value) => setData('team_id', value)} required>
                        <SelectTrigger id="tag-team">
                            <SelectValue placeholder="Select a team" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableTeams.map((team) => (
                                <SelectItem key={team.id} value={String(team.id)}>
                                    {team.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {availableTeams.length === 0 && <p className="text-sm text-muted-foreground">Join a team to create tags.</p>}
                    {errors.team_id && <p className="text-sm text-destructive">{errors.team_id}</p>}
                </div>
            )}

            <Button type="submit" disabled={processing || (!tag && availableTeams.length === 0)}>
                {processing ? <LoaderCircle /> : <BsPlusLg size={8} className="mr-2" />}
                {processing ? 'Loading' : tag ? 'Save Changes' : 'Add Tag'}
            </Button>
        </form>
    );
}
