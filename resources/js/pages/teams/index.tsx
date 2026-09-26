import { edit } from '@/actions/App/Http/Controllers/TeamController';
import PublicLayout from '@/layouts/public-layout';
import { type Team } from '@/types';
import { Link } from '@inertiajs/react';
import { Users } from 'lucide-react';

export default function TeamsIndex({
    canRegister = true,
    teams = [],
}: {
    canRegister?: boolean;
    teams?: Team[];
}) {
    return (
        <PublicLayout title="Teams" canRegister={canRegister}>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {teams.map((team) => (
                    <li
                        key={team.id}
                        className="flex items-center gap-3 rounded-lg border bg-background p-4"
                    >
                        {team.image_url ? (
                            <img
                                src={team.image_url}
                                alt=""
                                className="size-12 rounded object-cover"
                            />
                        ) : (
                            <div className="flex size-12 items-center justify-center rounded bg-muted text-muted-foreground">
                                <Users className="size-5" />
                            </div>
                        )}
                        <span className="mr-auto font-medium">{team.name}</span>
                        {team.can_edit && (
                            <Link
                                href={edit.url(team.id)}
                                className="text-sm text-primary hover:underline"
                            >
                                Manage
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </PublicLayout>
    );
}
