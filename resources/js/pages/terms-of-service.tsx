'use client';

import PublicLayout from '@/layouts/public-layout';

export default function TermsofService({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Terms of Service">
            <p>
                ## Terms of Service ### 1. Scope These Terms of Service
                ("Terms") govern the use of the website webdev-hq.com (the
                "Platform"), operated by a private individual. By accessing or
                using the Platform, you agree to these Terms. --- ### 2.
                Description of Service webdev-hq.com is a community-driven
                platform that allows users to: * Share and discover links
                (resources) * Publish posts or articles * (Planned) interact via
                comments and discussions The Platform is provided free of charge
                and without any guarantee of availability. --- ### 3. User
                Accounts To access certain features, users may create an
                account. You agree to: * Provide accurate and complete
                information * Keep your login credentials secure * Be
                responsible for all activities under your account The operator
                reserves the right to suspend or delete accounts at any time.
                --- ### 4. Social Login The Platform may offer authentication
                via third-party providers such as Google or GitHub. By using
                these services, you agree to their respective terms and privacy
                policies. The operator is not responsible for these external
                services. --- ### 5. User-Generated Content Users may submit
                content including links, posts, and (in the future) comments. By
                submitting content, you: * Confirm that you have the right to
                share it * Grant the Platform a non-exclusive, worldwide,
                royalty-free license to display and distribute it * Remain the
                owner of your content --- ### 6. Prohibited Content You agree
                not to publish content that: * Violates applicable laws *
                Infringes intellectual property rights * Contains harmful,
                abusive, or illegal material * Includes malware, phishing, or
                deceptive links * Is spam or misleading --- ### 7. Moderation
                and Removal The operator is not obligated to monitor content but
                reserves the right to: * Review user content * Remove or block
                content at any time * Suspend or terminate accounts A
                notice-and-takedown procedure is in place. Reports can be sent
                to: [admin@webdev-hq.com](mailto:admin@webdev-hq.com) --- ### 8.
                No Liability for User Content The Platform acts as a hosting
                provider for user-generated content. The operator does not
                assume responsibility for: * Accuracy or legality of user
                content * External links shared by users * Any damages resulting
                from the use of such content --- ### 9. External Links The
                Platform may contain links to third-party websites. The operator
                has no control over these websites and assumes no liability for
                their content or availability. --- ### 10. Availability of the
                Service The Platform is provided "as is" without warranties of
                any kind. The operator does not guarantee: * Continuous
                availability * Error-free operation * Data preservation --- ###
                11. Donations The Platform may accept voluntary donations (e.g.,
                via PayPal). Donations are optional and do not create any
                entitlement to services or benefits. --- ### 12. Termination The
                operator may suspend or terminate access to the Platform at any
                time without prior notice. Users may delete their accounts at
                any time. --- ### 13. Changes to the Terms These Terms may be
                updated at any time. Continued use of the Platform constitutes
                acceptance of the updated Terms. --- ### 14. Applicable Law
                These Terms are governed by the laws of the Federal Republic of
                Germany. --- ### 15. Contact For questions regarding these
                Terms, please contact:
                [admin@webdev-hq.com](mailto:admin@webdev-hq.com)
            </p>
        </PublicLayout>
    );
}
