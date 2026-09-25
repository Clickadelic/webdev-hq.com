'use client';

import {
    create,
    edit,
    index,
} from '@/actions/App/Http/Controllers/PostController';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import TablePagination from '@/components/ui/table-pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Paginator, type Post } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: index.url(),
    },
];

export default function DashboardPostsIndex() {
    const { posts } = usePage<{ posts: Paginator<Post> }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold">Posts</h1>
                        <p className="text-sm text-muted-foreground">
                            {posts.total} {posts.total === 1 ? 'post' : 'posts'}
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create.url()}>
                            <Plus className="size-4" />
                            New post
                        </Link>
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.data.length > 0 ? (
                            posts.data.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">
                                        {post.title}
                                    </TableCell>
                                    <TableCell>
                                        {post.category?.name ?? '-'}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {post.status}
                                    </TableCell>
                                    <TableCell>
                                        {post.published_at
                                            ? new Date(
                                                  post.published_at,
                                              ).toLocaleDateString()
                                            : '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Link href={edit.url(post.id)}>
                                                <Pencil className="size-3.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="py-12 text-center text-muted-foreground"
                                >
                                    No posts yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <TablePagination paginator={posts} />
            </div>
        </AppLayout>
    );
}
