import PublicLayout from '@/layouts/public-layout';
import LegalSidebar from '@/layouts/public-layout/sidebars/legal-sidebar';

import { Link } from '@inertiajs/react';

export default function LegalNotice({ canRegister = true }: { canRegister?: boolean }) {
    return (
        <PublicLayout canRegister={canRegister} title="Legal Notice" leftSidebar={<LegalSidebar />}>
            <p className="mb-3">
                All information in accordance with section 5 TMG (German Telemedia Act):
            </p>
            <address className="mb-3">
                <ul className="list-inside">
                    <li>Tobias Hopp</li>
                    <li>Oberer Markenweg 70</li>
                    <li>56566 Neuwied, Germany</li>
                    <li>
                        E-Mail:{' '}
                        <Link
                            href="mailto:admin@webdev-hq.com"
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="admin@webdev-hq.com"
                        >
                            admin@webdev-hq.com
                        </Link>
                    </li>
                </ul>
            </address>
            <section className="mb-8">
                <h3 className="mb-2 text-lg font-medium">Responsibility for Content</h3>
                <p>
                    As a private individual, I am responsible for my own content on this website in
                    accordance with general laws. However, I am not obligated to monitor transmitted
                    or stored third-party information or to investigate circumstances that indicate
                    illegal activity. Obligations to remove or block the use of information under
                    general laws remain unaffected.
                </p>
            </section>
            <section className="mb-8">
                <h3 className="mb-2 text-lg font-medium">Responsibility for Links</h3>
                <p>
                    This platform contains links and content created by users (user-generated
                    content). I have no control over the content of external websites and therefore
                    cannot accept any liability for such external content. The respective provider
                    or operator of the linked pages is always responsible for the content of those
                    pages. Upon becoming aware of any legal violations, such links will be removed
                    immediately.
                </p>
            </section>
            <section className="mb-8">
                <h3 className="mb-2 text-lg font-medium">Copyright</h3>
                <p>
                    The content created by the site operator on this platform is subject to
                    copyright law. Contributions by users remain the property of their respective
                    authors. If you believe that any content violates your rights, please contact us
                    via email.
                </p>
            </section>
        </PublicLayout>
    );
}
