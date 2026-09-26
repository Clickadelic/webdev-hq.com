import PublicTitle from '@/components/public-title';
import PublicLayout from '@/layouts/public-layout';

export default function Contact({ canRegister = true }: { canRegister?: boolean }) {
    return (
        <PublicLayout title="Contact" canRegister={canRegister}>
            <PublicTitle title="Contact" />
        </PublicLayout>
    );
}
