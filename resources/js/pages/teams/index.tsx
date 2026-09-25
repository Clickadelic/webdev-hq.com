import PublicTitle from '@/components/public-title';
import PublicLayout from '@/layouts/public-layout';

export default function TeamsIndex({
    canRegister = true,
    teams = [],
}: {
    canRegister?: boolean;
    teams?: any[]; // Array of team objects, make typesafe
}) {
    return (
        <PublicLayout title="Teams" canRegister={canRegister}>
            <PublicTitle title="Teams" />
            <ul className="grid grid-cols-2 gap-4">
                {teams.map((team: any) => (
                    <li
                        key={team.id}
                        className="rounded bg-white p-4 text-center"
                    >
                        {team.name}
                    </li>
                ))}
            </ul>
        </PublicLayout>
    );
}
