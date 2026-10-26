import PublicLayout from '@/layouts/public-layout';

export default function Contact({ canRegister = true }: { canRegister?: boolean }) {
    return (
        <PublicLayout title="Contact" canRegister={canRegister}>
            <>ContactForm</>
        </PublicLayout>
    );
}
