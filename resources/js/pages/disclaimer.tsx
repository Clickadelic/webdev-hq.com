import PublicLayout from '@/layouts/public-layout';

export default function Disclaimer({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <PublicLayout canRegister={canRegister} title="Disclaimer">
            <article>
                <section>
                    <h3 className="text-lg font-semibold">
                        User Generated Content
                    </h3>
                    <p>
                        webdev-hq.com is a community-driven platform where users
                        can publish links, articles, and other content. The
                        operator of this website does not take responsibility
                        for content created and published by users. All
                        opinions, links, and materials reflect the views of the
                        respective users and not those of the operator.
                    </p>
                </section>
                <section>
                    <h3 className="text-lg font-semibold">
                        No Liability for External Links
                    </h3>
                    <p>
                        This platform may contain links to external websites.
                        The operator has no influence over the content of those
                        websites and therefore assumes no liability for their
                        accuracy, legality, or availability.
                    </p>
                </section>
                <section>
                    <h3 className="text-lg font-semibold">
                        Notice of illegal content
                    </h3>
                    <p>
                        Notice and Takedown If you become aware of illegal,
                        harmful, or infringing content, please report it to:
                        [admin@webdev-hq.com](mailto:admin@webdev-hq.com)
                        Reported content will be reviewed and removed promptly
                        if necessary.
                    </p>
                </section>
                <section>
                    <h3 className="text-lg font-semibold">
                        No professional advice
                    </h3>
                    <p>
                        The content provided on this platform is for
                        informational purposes only and does not constitute
                        professional advice of any kind.
                    </p>
                </section>
            </article>
        </PublicLayout>
    );
}
