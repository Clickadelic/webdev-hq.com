import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Hyperlink } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';

import HyperlinkStatusBadge from '../hyperlink-statusbadge';

export default function HyperlinkTable() {
    const { hyperlinks } = usePage<{ hyperlinks: { data: Hyperlink[] } }>()
        .props;
    const items = hyperlinks?.data ?? [];

    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12">Id</TableHead>
                    <TableHead className="w-16">Status</TableHead>
                    <TableHead className="w-16">Favicon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Description</TableHead>
                    {/* <TableHead>Category</TableHead> */}
                    <TableHead className="w-16">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length > 0 ? (
                    items.map((link: Hyperlink) => (
                        <TableRow key={link.id}>
                            <TableCell>{link.id}</TableCell>
                            <TableCell>
                                <HyperlinkStatusBadge status={link.status} />
                            </TableCell>
                            <TableCell>
                                <img
                                    src={link.favicon_url || ''}
                                    alt="favicon"
                                />
                            </TableCell>
                            <TableCell>{link.title}</TableCell>

                            <TableCell>
                                <Link
                                    href={link.url}
                                    target="_blank"
                                    title={link.url}
                                    rel="noopener noreferrer"
                                    className="hover:text-primary hover:underline"
                                >
                                    {link.url}
                                </Link>
                            </TableCell>
                            <TableCell>{link.description}</TableCell>
                            {/* <TableCell>{link.category || undefined}</TableCell> */}

                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center justify-center rounded-full border p-2 text-muted-foreground transition-colors hover:cursor-pointer hover:border-primary hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                                            <Ellipsis className="size-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className="text-center text-muted-foreground"
                        >
                            No hyperlinks yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
