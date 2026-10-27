import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { type Paginator, type Post } from '@/types';
import { router } from '@inertiajs/react';

import { show } from '@/actions/App/Http/Controllers/PostController';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ImageOff, MoveRight } from 'lucide-react';

export default function PostsIndex({ posts, canRegister = true }: { posts: Paginator<Post>; canRegister?: boolean }) {
    return (
        <PublicLayout title="Posts" showTitle={true} canRegister={canRegister}>
            {posts.data.length >= 1 ? (
                <div className="pb-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {posts.data.map((post) => (
                            <div className="rounded-xl bg-white/30 p-1 dark:bg-neutral-800/30">
                                <article key={post.id} className="flex min-h-72 flex-col overflow-hidden rounded-lg bg-white transition-all dark:bg-neutral-900">
                                    {post.featured_image ? (
                                        <img src={post.featured_image} alt="" className="h-44 w-full object-cover" />
                                    ) : (
                                        <div className="flex h-44 items-center justify-center bg-white transition-all dark:bg-neutral-900">
                                            <ImageOff className="size-6" />
                                        </div>
                                    )}
                                    <div className="flex grow flex-col gap-3 p-5">
                                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                                            {post.category && (
                                                <span className="cursor-default rounded border border-primary/20 bg-primary/10 px-2 py-1 font-medium text-primary">{post.category.name}</span>
                                            )}
                                            {post.published_at && (
                                                <time className="cursor-default" dateTime={post.published_at}>
                                                    {new Date(post.published_at).toLocaleDateString()}
                                                </time>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="line-clamp-2 h-14 text-xl font-semibold">{post.title}</h2>
                                            {(post.description || post.subline) && <p className="line-clamp-3 h-15 text-sm text-muted-foreground">{post.description ?? post.subline}</p>}
                                        </div>
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="mt-auto flex flex-wrap gap-2 text-xs text-primary">
                                                {post.tags.map((tag) => (
                                                    <span key={tag.id} className="cursor-default">
                                                        #{tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <Link
                                            className="mt-auto flex items-center justify-center gap-3 rounded bg-primary py-1.5 text-center text-primary-foreground transition-all hover:gap-5 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                                            href={show.url(post.slug)}
                                        >
                                            Read more
                                            <MoveRight className="mt-1 size-4" />
                                        </Link>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>

                    {posts.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2 border-transparent hover:border-primary">
                            <Button variant="outline" size="sm" disabled={!posts.prev_page_url} onClick={() => posts.prev_page_url && router.get(posts.prev_page_url)}>
                                <ChevronLeft className="size-4" />
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {posts.current_page} of {posts.last_page}
                            </span>
                            <Button variant="outline" size="sm" disabled={!posts.next_page_url} onClick={() => posts.next_page_url && router.get(posts.next_page_url)}>
                                Next
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="py-16 text-center">
                    <p className="text-muted-foreground">No posts found.</p>
                </div>
            )}
        </PublicLayout>
    );
}
