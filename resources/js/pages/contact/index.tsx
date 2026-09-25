import PublicTitle from '@/components/public-title';
import PublicLayout from '@/layouts/public-layout';
export default function Contact() {
    return (
        <PublicLayout title="Contact" canRegister={false}>
            <PublicTitle title="Contact" />
        </PublicLayout>
    );
}
