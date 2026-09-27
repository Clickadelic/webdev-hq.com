import TeamController from '@/actions/App/Http/Controllers/TeamController';
import InputError from '@/components/input-error';
import PublicTitle from '@/components/public-title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/public-layout';
import { type Team } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { Plus, Users } from 'lucide-react';
export default function TeamsIndex({ teams = [] }: { teams?: Team[] }) {
    return (
        <PublicLayout title="My teams">
            <Head title="My teams" />
            <div className="mx-auto w-full max-w-5xl space-y-8 p-4 sm:p-6">
                <PublicTitle title="My teams" />

                <section className="border-b pb-6">
                    <h2 className="mb-4 text-lg font-semibold">Create a team</h2>
                    <Form
                        {...TeamController.store.form()}
                        className="flex flex-wrap items-end gap-3"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid min-w-56 flex-1 gap-2">
                                    <Label htmlFor="team-name">Team name</Label>
                                    <Input id="team-name" name="name" required maxLength={255} />
                                    <InputError message={errors.name} />
                                </div>
                                <Button type="submit" disabled={processing}>
                                    <Plus />
                                    Create team
                                </Button>
                            </>
                        )}
                    </Form>
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-semibold">Your teams</h2>
                    {teams.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            You are not in a team yet. Create one above or ask a team owner to add
                            you.
                        </p>
                    ) : (
                        <ul className="divide-y border-y">
                            {teams.map((team) => (
                                <li key={team.id} className="flex items-center gap-3 py-4">
                                    {team.image_url ? (
                                        <img
                                            src={team.image_url}
                                            alt=""
                                            className="size-11 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex size-11 items-center justify-center rounded bg-muted text-muted-foreground">
                                            <Users className="size-5" />
                                        </div>
                                    )}
                                    <div className="mr-auto min-w-0">
                                        <p className="truncate font-medium">{team.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {team.can_manage ? 'Owner' : 'Member'} ·{' '}
                                            {team.members_count ?? 0} members
                                        </p>
                                    </div>
                                    {team.can_manage && (
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={TeamController.edit.url(team.id)}>
                                                Manage
                                            </Link>
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </PublicLayout>
    );
}
