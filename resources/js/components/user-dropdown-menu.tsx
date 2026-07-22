import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { type User } from '@/types';
import { CircleUser } from 'lucide-react';
interface UserDropdownMenuProps {
    user: User;
}

export default function UserDropdownMenu({ user }: UserDropdownMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:cursor-pointer">
                    <CircleUser /> {user.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <UserMenuContent user={user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
