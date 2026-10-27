import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { UserInfo } from '@/layouts/public-layout/user-info';
import { type User } from '@/types';

interface UserDropdownMenuProps {
    user: User;
}

/**
 *
 * @param User
 * @returns A component that shows a dropdown-menu with the current user links
 */

export default function UserDropdownMenu({ user }: UserDropdownMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:cursor-pointer">
                    <UserInfo user={user} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <UserMenuContent user={user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
