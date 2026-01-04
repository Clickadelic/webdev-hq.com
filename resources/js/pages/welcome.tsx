import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <PublicLayout canRegister={canRegister} title="Welcome">
            <h1>Welcome</h1> 
        </PublicLayout>
    );
}
