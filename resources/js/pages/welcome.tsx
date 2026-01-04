import PublicLayout from '@/layouts/public-layout';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            <main className="container mx-auto flex flex-col items-center justify-center py-12">
                <h1>Welcome</h1>
            </main>
        </PublicLayout>
    );
}
