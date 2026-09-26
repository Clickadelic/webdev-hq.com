import AppLogo from '@/components/app-logo';
import BackgroundImage from '@/components/background-image';
import { type PropsWithChildren } from 'react';
interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <BackgroundImage>
            <div className="dark:bg-neutral w-84 rounded-xl bg-white/30 p-2 shadow-lg md:w-96">
                <div className="flex flex-col gap-8 rounded-md bg-white p-8 dark:bg-neutral-900">
                    <div className="flex flex-col items-center gap-4">
                        <div className="mb-1 flex items-center justify-center">
                            <AppLogo className="p-2" logoClassName="size-8" />
                        </div>
                        <span className="sr-only">{title}</span>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </BackgroundImage>
    );
}
