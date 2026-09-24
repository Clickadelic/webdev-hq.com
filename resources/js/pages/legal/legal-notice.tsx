import SidebarLegal from '@/components/public-sidebars/sidebar-legal';
import PublicLayout from '@/layouts/public-layout';

import { Link } from '@inertiajs/react';

export default function LegalNotice({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout
            canRegister={canRegister}
            title="Legal Notice"
            sidebar={<SidebarLegal />}
        >
            <div className="space-y-5">
                <section>
                    <h2 className="mb-3 text-2xl font-medium">Legal Notice</h2>
                    <p>
                        All information in accordance with section 5 TMG (German
                        Telemedia Act):
                    </p>
                    <ul className="my-3 list-inside list-disc">
                        <li>Tobias Hopp</li>
                        <li>Oberer Markenweg 70</li>
                        <li>56566 Neuwied, Germany</li>
                        <li>
                            <Link
                                href="mailto:admin@webdev-hq.com"
                                className="text-blue-500"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="admin@webdev-hq.com"
                            >
                                admin@webdev-hq.com
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2 className="mb-3 text-2xl font-semibold">
                        Responsibility for Content
                    </h2>
                    <p>
                        As a private individual, I am responsible for my own
                        content on this website in accordance with general laws.
                        However, I am not obligated to monitor transmitted or
                        stored third-party information or to investigate
                        circumstances that indicate illegal activity.
                        Obligations to remove or block the use of information
                        under general laws remain unaffected.
                    </p>
                </section>
                <section>
                    <h2 className="mb-3 text-2xl font-semibold">
                        Responsibility for Links
                    </h2>
                    <p>
                        This platform contains links and content created by
                        users (user-generated content). I have no control over
                        the content of external websites and therefore cannot
                        accept any liability for such external content. The
                        respective provider or operator of the linked pages is
                        always responsible for the content of those pages. Upon
                        becoming aware of any legal violations, such links will
                        be removed immediately.
                    </p>
                </section>
                <section>
                    <h2 className="mb-3 text-2xl font-semibold">Copyright</h2>
                    <p>
                        The content created by the site operator on this
                        platform is subject to copyright law. Contributions by
                        users remain the property of their respective authors.
                        If you believe that any content violates your rights,
                        please contact us via email.
                    </p>
                </section>
            </div>
        </PublicLayout>
    );
}
