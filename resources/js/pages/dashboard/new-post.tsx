import SidebarLegal from '@/components/public-sidebars/sidebar-legal';
import PublicLayout from '@/layouts/public-layout';

export default function NewPost({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout
            canRegister={canRegister}
            title="Legal"
            sidebar={<SidebarLegal />}
        >
            <h3>New Post</h3>
        </PublicLayout>
    );
}
