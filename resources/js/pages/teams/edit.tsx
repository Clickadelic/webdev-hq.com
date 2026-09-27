import TeamController from '@/actions/App/Http/Controllers/TeamController';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Team, type TeamMember } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Trash2, UserMinus, UserPlus } from 'lucide-react';

/**
 * A component for editing team settings, including updating the team image.
 * @param param0 The props for the TeamEdit component, including the team to be edited.
 * @returns The JSX element representing the team edit page.
 */
export default function TeamEdit({ team, members }: { team: Team; members: TeamMember[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Team settings', href: TeamController.edit.url(team.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${team.name} settings`} />

            <div className="max-w-2xl space-y-8 p-4">
                <Link
                    href="/teams"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    My teams
                </Link>

                <HeadingSmall title="Team details" description="Update your team name and image." />

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
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Team name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            defaultValue={team.name}
                                            required
                                            maxLength={255}
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="image">Team image</Label>
                                        <Input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                        />
                                    </div>
                                    <InputError message={errors.image} />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save changes</Button>
                                {recentlySuccessful && (
                                    <p className="text-sm text-muted-foreground">Saved</p>
                                )}
                            </div>
                        </>
                    )}
                </Form>

                <section className="space-y-4 border-t pt-6">
                    <HeadingSmall
                        title="Members"
                        description="Add existing WebDev HQ users or remove access."
                    />
                    <Form
                        {...TeamController.addMember.form(team.id)}
                        className="flex flex-wrap items-end gap-3"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid min-w-56 flex-1 gap-2">
                                    <Label htmlFor="member-email">Member email</Label>
                                    <Input id="member-email" name="email" type="email" required />
                                    <InputError message={errors.email} />
                                </div>
                                <Button disabled={processing}>
                                    <UserPlus />
                                    Add member
                                </Button>
                            </>
                        )}
                    </Form>

                    <ul className="divide-y border-y">
                        {members.map((member) => (
                            <li key={member.id} className="flex items-center gap-3 py-3">
                                <div className="mr-auto min-w-0">
                                    <p className="truncate font-medium">
                                        {member.name}
                                        {member.is_owner ? ' · Owner' : ''}
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {member.email}
                                    </p>
                                </div>
                                {!member.is_owner && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        title={`Remove ${member.name}`}
                                        aria-label={`Remove ${member.name}`}
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    `Remove ${member.name} from ${team.name}?`,
                                                )
                                            ) {
                                                router.delete(
                                                    TeamController.removeMember.url({
                                                        team: team.id,
                                                        member: member.id,
                                                    }),
                                                );
                                            }
                                        }}
                                    >
                                        <UserMinus />
                                    </Button>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-3 border-t border-destructive/30 pt-6">
                    <HeadingSmall
                        title="Delete team"
                        description="This removes team membership. Existing content stays in your account as personal content."
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                            if (
                                window.confirm(
                                    `Delete ${team.name}? Team content will become personal.`,
                                )
                            ) {
                                router.delete(TeamController.destroy.url(team.id));
                            }
                        }}
                    >
                        <Trash2 />
                        Delete team
                    </Button>
                </section>
            </div>
        </AppLayout>
    );
}
