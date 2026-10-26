import PublicLayout from '@/layouts/public-layout';
import LegalSidebar from '@/layouts/public-layout/sidebars/legal-sidebar';

/**
 *
 * @param canRegister: boolean
 * @returns
 */

export default function LegalIndex({ canRegister = true }: { canRegister?: boolean }) {
    return (
        <PublicLayout canRegister={canRegister} title="Legal" leftSidebar={<LegalSidebar />}>
            LinkGrid
        </PublicLayout>
    );
}
