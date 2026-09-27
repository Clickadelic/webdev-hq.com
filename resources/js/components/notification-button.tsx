import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { IoIosNotificationsOutline } from 'react-icons/io';

export const NotificationButton = () => {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-10 rounded p-3 hover:bg-slate-100">
                    <IoIosNotificationsOutline className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-100 overflow-hidden rounded-sm border bg-white p-3 shadow-sm"
            >
                <h4 className="text-md mb-4 flex justify-between p-2 font-medium">
                    <span>Nachrichten</span>
                    <span>3</span>
                </h4>
                <ul className="space-y-1">
                    <li className="p-2 text-slate-700">Dein Gewinn im Lotto</li>
                    <li className="p-2 text-slate-700">Deine Steuererklärung</li>
                    <li className="p-2 text-slate-700">Dein Bürgergeldantrag</li>
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
