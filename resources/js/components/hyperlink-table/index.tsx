import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Hyperlink } from '@/types';
import { usePage } from '@inertiajs/react';

export default function HyperlinkTable() {
    const { hyperlinks } = usePage<{ hyperlinks: { data: Hyperlink[] } }>()
        .props;
    const items = hyperlinks?.data ?? [];

    return (
        <Table className="w-full rounded border">
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Favicon</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length > 0 ? (
                    items.map((link: Hyperlink) => (
                        <TableRow key={link.id}>
                            <TableCell>{link.id}</TableCell>
                            <TableCell>{link.title}</TableCell>
                            <TableCell>{link.url}</TableCell>
                            <TableCell>{link.favicon_url}</TableCell>
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
