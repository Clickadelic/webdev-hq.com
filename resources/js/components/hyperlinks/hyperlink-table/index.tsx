import { destroy } from '@/actions/App/Http/Controllers/HyperlinkController';
import ContextMenu from '@/components/context-menu';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import TablePagination from '@/components/ui/table-pagination';
import { type Hyperlink, type Paginator } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { toast } from 'sonner';

import HyperlinkStatusBadge from '../hyperlink-statusbadge';

interface HyperlinkTableProps {
    onEdit: (hyperlink: Hyperlink) => void;
}

export default function HyperlinkTable({ onEdit }: HyperlinkTableProps) {
    const { hyperlinks } = usePage<{ hyperlinks: Paginator<Hyperlink> }>()
        .props;
    const items = hyperlinks?.data ?? [];

    function handleDelete(id: number) {
        router.delete(destroy.url({ hyperlink: String(id) }), {
            preserveScroll: true,
            onSuccess: () => toast.success('Hyperlink deleted.'),
            onError: () => toast.error('Failed to delete hyperlink.'),
        });
    }

    return (
        <div className="flex flex-col">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">Id</TableHead>
                        <TableHead className="w-16">Status</TableHead>
                        <TableHead className="w-16">Favicon</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length > 0 ? (
                        items.map((link: Hyperlink) => (
                            <TableRow key={link.id}>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline">
                                                <Info className="size-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverHeader>
                                                <PopoverTitle>
                                                    Title
                                                </PopoverTitle>
                                                <PopoverDescription>
                                                    {link.description ||
                                                        'No description available.'}
                                                </PopoverDescription>
                                            </PopoverHeader>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell>
                                    <HyperlinkStatusBadge
                                        status={link.status}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img src={link.favicon_url || ''} alt="" />
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
                                <TableCell>
                                    <ContextMenu
                                        item={link}
                                        dotStyle="horizontal"
                                        onEdit={onEdit}
                                        onDelete={handleDelete}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="text-center text-muted-foreground"
                            >
                                No hyperlinks yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {hyperlinks && <TablePagination paginator={hyperlinks} />}
        </div>
    );
}
