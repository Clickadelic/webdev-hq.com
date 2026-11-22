import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

/**
 * A component that displays a cookie notice at the bottom of the page.
 *
 * The notice will only be visible if the user has not given consent to the use of cookies.
 * The notice will contain a link to the cookie policy page and a button to accept the use of cookies.
 *
 * The component uses the `useState` hook to store the visibility of the notice and the `useEffect` hook to check if the user has given consent.
 */
export default function CookieNotice() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) setVisible(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed right-0 bottom-4 left-0 z-50 flex justify-center px-2">
            <Card className="w-full max-w-2xl border bg-background shadow-lg">
                <CardContent className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
                    <p className="text-sm leading-snug text-muted-foreground">
                        🍪 This website only uses technically necessary cookies, e.g. for login and
                        security. No <strong>tracking or advertising cookies</strong> are used.{' '}
                        <a
                            href="/cookie-policy"
                            className="ml-1 text-primary underline hover:text-primary/80"
                        >
                            Learn more
                        </a>
                    </p>

                    <Button size="sm" onClick={acceptCookies} className="shrink-0">
                        Okay, I'm fine
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
