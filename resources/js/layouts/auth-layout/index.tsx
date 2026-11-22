import FloatingGradient from '@/components/floating-gradient';
import AppLogo from '@/layouts/dashboard-layout/app-logo';
import { type PropsWithChildren } from 'react';

export interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
	canRegister?: boolean;
	showGradient?: boolean;
	interactive?: boolean;
}

export interface AuthStatusPageProps {
    status?: string;
}

export interface AuthLoginPageProps extends AuthStatusPageProps, Pick<AuthLayoutProps, 'showGradient' | 'interactive'> {
    canResetPassword: boolean;
    canRegister: boolean;
}

export interface AuthResetPasswordPageProps {
    token: string;
    email: string;
}

/**
 * A layout component for authentication pages that displays a logo, title, description, and children content.
 *
 * @param {React.ReactNode} children - The children of the component
 * @param {string} title - The title of the authentication page
 * @param {string} description - The description/subline below the logo of the authentication page
 * @returns {React.ReactNode} - The wrapped children in the authentication layout component
 */
export default function AuthSimpleLayout({
    children,
    title,
    description,
    showGradient = true,
    interactive = false,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative isolate flex min-h-svh flex-col items-center justify-center bg-neutral-200 p-6 md:p-10 dark:bg-neutral-900">
            {showGradient && <FloatingGradient isInteractive={interactive} />}
            <div className="dark:bg-neutral w-full max-w-84 rounded-xl bg-white/30 p-1 shadow-lg md:max-w-96">
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
		</div>
    );
}
