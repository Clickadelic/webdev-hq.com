import { useMediaQuery } from '@/hooks/useMediaQuery';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';

interface ResponsiveDialogProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

/**
 * A responsive dialog component that will render a Dialog on desktop and a Drawer on mobile devices.
 * It takes an icon, title, description, isOpen, setIsOpen, and children as props.
 * @param {ResponsiveDialogProps} props - The props for the responsive dialog component.
 * @returns {JSX.Element} - The JSX element for the responsive dialog component.
 */
export const ResponsiveDialog = ({
    icon,
    title,
    description,
    isOpen,
    setIsOpen,
    children,
}: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex">
                            <span className="mr-2">{icon}</span>
                            <span>{title}</span>
                        </DialogTitle>
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="flex">
                        <span className="mr-2">{icon}</span>
                        <span>{title}</span>
                    </DrawerTitle>
                    {description && (
                        <DrawerDescription>{description}</DrawerDescription>
                    )}
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    );
};
