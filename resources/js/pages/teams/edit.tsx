import TeamController from '@/actions/App/Http/Controllers/TeamController';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Team } from '@/types';
import { Form, Head } from '@inertiajs/react';

export default function TeamEdit({ team }: { team: Team }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Team settings', href: TeamController.edit.url(team.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${team.name} settings`} />

            <div className="max-w-xl space-y-6 p-4">
                <HeadingSmall
                    title="Team image"
                    description="Upload an image that represents your team"
                />

                <Form
                    {...TeamController.update.form(team.id)}
                    options={{
                        preserveScroll: true,
                        forceFormData: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, recentlySuccessful, errors }) => (
                        <>
                            <div className="flex items-center gap-4">
                                <Avatar className="size-20 rounded-lg">
                                    <AvatarImage
                                        src={team.image_url ?? undefined}
                                        alt={team.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {team.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="image">Team image</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        required
                                    />
                                    <InputError message={errors.image} />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>
                                    Save image
                                </Button>
                                {recentlySuccessful && (
                                    <p className="text-sm text-muted-foreground">
                                        Saved
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
