import PublicLayout from '@/layouts/public-layout';

export default function PostsIndex({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout title="Posts" canRegister={canRegister}>
            <h1>Public Posts Index</h1>
        </PublicLayout>
    );
}
