import PublicTitle from '@/components/public-title';
import PublicLayout from '@/layouts/public-layout';

export default function ChromeExtension() {
    return (
        <PublicLayout title="Chrome-Extension" canRegister={false}>
            <PublicTitle title="Chrome-Extension" />
        </PublicLayout>
    );
}
