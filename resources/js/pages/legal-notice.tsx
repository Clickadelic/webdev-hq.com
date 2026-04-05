'use client';

import PublicLayout from '@/layouts/public-layout';

export default function LegalNotice({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Legal Notice">
            <p>
                Information in accordance with Section 5 TMG (German Telemedia
                Act): **Name:** Tobias Hopp **Address:** [PLEASE INSERT YOUR
                FULL POSTAL ADDRESS HERE] **Contact:** Email:
                [admin@webdev-hq.com](mailto:admin@webdev-hq.com) --- ##
                Responsibility for Content As a private individual, I am
                responsible for my own content on this website in accordance
                with general laws. However, I am not obligated to monitor
                transmitted or stored third-party information or to investigate
                circumstances that indicate illegal activity. Obligations to
                remove or block the use of information under general laws remain
                unaffected. --- ## Responsibility for Links This platform
                contains links and content created by users (user-generated
                content). I have no control over the content of external
                websites and therefore cannot accept any liability for such
                external content. The respective provider or operator of the
                linked pages is always responsible for the content of those
                pages. Upon becoming aware of any legal violations, such links
                will be removed immediately. --- ## Copyright The content
                created by the site operator on this platform is subject to
                copyright law. Contributions by users remain the property of
                their respective authors. If you believe that any content
                violates your rights, please contact me via email.
            </p>
        </PublicLayout>
    );
}
