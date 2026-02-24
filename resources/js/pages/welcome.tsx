import PublicLayout from '@/layouts/public-layout';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            <main className="container mx-auto flex flex-col items-center justify-center py-12">
                <h1 className="bg-primary text-primary-foreground px-4 py-2 rounded">Welcome</h1>
            </main>
        </PublicLayout>
    );
}
