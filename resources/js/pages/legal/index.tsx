import PublicLayout from '@/layouts/public-layout';
import SidebarLegal from '@/layouts/public-layout/sidebars/legal-sidebar';

export default function LegalIndex({ canRegister = true }: { canRegister?: boolean }) {
    return (
        <PublicLayout canRegister={canRegister} title="Legal" sidebar={<SidebarLegal />}>
            <h2 className="mb-6 flex gap-3 text-xl font-medium">Legal Overview</h2>
            LinkGrid
        </PublicLayout>
    );
}
