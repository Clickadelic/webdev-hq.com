import PublicLayout from '@/layouts/public-layout';

export default function CookiePolicy({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Cookie Policy">
            <main className="container mx-auto flex flex-col items-center justify-center py-12">
                <h1 className="mb-8 text-4xl font-bold">Cookie Policy</h1>
                <p>
                    ## Privacy Policy ### 1. General Information Protecting your
                    personal data is important to me. This website is designed
                    with a strong focus on privacy and minimal data collection.
                    ### 2. Data Controller Tobias Hopp Email:
                    [admin@webdev-hq.com](mailto:admin@webdev-hq.com) ### 3.
                    Data We Collect We only collect data necessary to operate
                    the platform: * Account information (e.g., username, email
                    address) * Content you submit (links, posts, comments) *
                    Technical data (e.g., IP address, browser type) stored in
                    server logs ### 4. Server Hosting This website is hosted by
                    a provider located in Germany. Server logs may be
                    automatically collected and stored by the hosting provider
                    for security and operational purposes. A data processing
                    agreement (DPA) is in place with the hosting provider in
                    accordance with GDPR requirements. ### 5. Authentication &
                    Social Login Users may register using traditional login
                    methods or third-party authentication providers (e.g.,
                    Google, GitHub). When using social login, certain data may
                    be transferred from these providers. Please refer to their
                    privacy policies: * Google * GitHub ### 6. Cookies This
                    website uses essential cookies required for functionality,
                    such as: * Session management (login status) * Security
                    purposes No tracking or advertising cookies are used. ### 7.
                    Donations If you choose to make a voluntary donation via
                    PayPal, your payment data will be processed by PayPal. The
                    operator does not store payment information. ### 8. Your
                    Rights (GDPR) You have the right to: * Access your data *
                    Request correction or deletion * Restrict processing *
                    Object to processing To exercise your rights, contact:
                    [admin@webdev-hq.com](mailto:admin@webdev-hq.com) ### 9.
                    Data Retention Personal data is stored only as long as
                    necessary for the operation of the platform or as required
                    by law. ### 10. Changes This privacy policy may be updated
                    to reflect changes in functionality or legal requirements.
                </p>
            </main>
        </PublicLayout>
    );
}
