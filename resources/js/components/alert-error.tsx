import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

/**
 * A component that displays a list of error messages in an alert box.
 *
 * @param {string[]} errors - The list of error messages to display
 * @param {string} [title] - The optional title of the alert
 * @returns {React.ReactNode} - The rendered alert component
 */
export default function AlertError({ errors, title }: { errors: string[]; title?: string }) {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{title || 'Something went wrong.'}</AlertTitle>
            <AlertDescription>
                <ul className="list-inside list-disc text-sm">
                    {Array.from(new Set(errors)).map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
}
