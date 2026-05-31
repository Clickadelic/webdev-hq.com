import PublicSidebarLeftLayout from '@/layouts/public-sidebar-left-layout';

export default function CookiePolicy({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicSidebarLeftLayout
            canRegister={canRegister}
            title="Cookie Policy"
        >
            <article className="space-y-5">
                <section>
                    <h3 className="mb-1 text-lg font-semibold">
                        Cookie Policy
                    </h3>
                    General Information Protecting your personal data is
                    important to us. This website is designed with a strong
                    focus on privacy and minimal data collection.
                </section>
                <section>
                    <h3 className="mb-1 text-lg font-semibold">
                        Data Controller
                    </h3>
                    Tobias Hopp Email:
                    [admin@webdev-hq.com](mailto:admin@webdev-hq.com)
                </section>
                <section>
                    <h3 className="mb-1 text-lg font-semibold">
                        Data We Collect and How We Use It
                    </h3>
                    We only collect data necessary to operate the platform: *
                    Account information (e.g., username, email address) *
                    Content you submit (links, posts, comments) * Technical data
                    (e.g., IP address, browser type) stored in server.
                </section>
                <section>
                    <h3 className="mb-1 text-lg font-semibold">
                        Hosting & Server Logs
                    </h3>
                    This website is hosted by a provider located in Germany.
                    Server logs may be automatically collected and stored by the
                    hosting provider for security and operational purposes. A
                    data processing agreement (DPA) is in place with the hosting
                    provider in accordance with GDPR requirements.
                </section>
                <section>
                    <h3 className="mb-1 text-lg font-semibold">
                        5. Authentication & Social Login
                    </h3>
                    Users may register using traditional login methods or
                    third-party authentication providers (e.g., Google, GitHub).
                    When using social login, certain data may be transferred
                    from these providers. Please refer to their privacy
                    policies: * Google * GitHub
                </section>
                <section>
                    <h3 className="mb-1 text-lg font-semibold">6. Cookies</h3>
                    This website uses essential cookies required for
                    functionality, such as: * Session management (login status)
                    * Security purposes No tracking or advertising cookies are
                    used.
                </section>
                <section>
                    <h3 className="mb-1 text-lg font-semibold">7. Donations</h3>
                    If you choose to make a voluntary donation via PayPal, your
                    payment data will be processed by PayPal. The operator does
                    not store payment information.
                </section>
                <section>
                    <h3 className="mb-1 text-lg font-semibold">
                        8. Your Rights (GDPR)
                    </h3>
                    You have the right to: * Access your data * Request
                    correction or deletion * Restrict processing * Object to
                    processing To exercise your rights, contact:
                    [admin@webdev-hq.com](mailto:admin@webdev-hq.com)
                </section>
                <section>
                    <h3 className="mb-1 text-lg font-semibold">
                        9. Data Retention
                    </h3>
                    Personal data is stored only as long as necessary for the
                    operation of the platform or as required by law. ### 10.
                    Changes This privacy policy may be updated to reflect
                    changes in functionality or legal requirements.
                </section>
            </article>
        </PublicSidebarLeftLayout>
    );
}
