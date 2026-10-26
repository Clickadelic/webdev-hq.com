import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { type Paginator, type Post } from '@/types';
import { router } from '@inertiajs/react';

import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/PostController';
export default function PostsIndex({
    posts,
    canRegister = true,
}: {
    posts: Paginator<Post>;
    canRegister?: boolean;
}) {
    return (
        <PublicLayout title="Posts" showTitle={true} canRegister={canRegister}>
            {posts.data.length >= 1 ? (
                <div className="pb-8">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {posts.data.map((post) => (
                            <article
                                key={post.id}
                                className="transition-all flex min-h-72 flex-col overflow-hidden rounded-lg border border-border bg-background"
                            >
                                {post.featured_image ? (
                                    <img
                                        src={post.featured_image}
                                        alt=""
                                        className="h-44 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-44 items-center justify-center bg-muted text-muted-foreground">
                                        <ImageOff className="size-6" />
                                    </div>
                                )}
                                <div className="flex grow flex-col gap-3 p-5">
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                        {post.category && (
                                            <span className="rounded border border-primary/20 bg-primary/10 px-2 py-1 font-medium text-primary">
                                                {post.category.name}
                                            </span>
                                        )}
                                        {post.published_at && (
                                            <time dateTime={post.published_at}>
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </time>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-semibold">{post.title}</h2>
                                        {(post.description || post.subline) && (
                                            <p className="line-clamp-3 text-sm text-muted-foreground">
                                                {post.description ?? post.subline}
                                            </p>
                                        )}
                                    </div>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mt-auto flex flex-wrap gap-2 text-xs text-primary">
                                            {post.tags.map((tag) => (
                                                <span key={tag.id}>#{tag.name}</span>
                                            ))}
                                        </div>
                                    )}
									<Link
										className="mt-auto"
										href={show.url(post.slug)}
									>
										Read more
									</Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {posts.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2 border-transparent hover:border-primary">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!posts.prev_page_url}
                                onClick={() =>
                                    posts.prev_page_url && router.get(posts.prev_page_url)
                                }
                            >
                                <ChevronLeft className="size-4" />
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {posts.current_page} of {posts.last_page}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!posts.next_page_url}
                                onClick={() =>
                                    posts.next_page_url && router.get(posts.next_page_url)
                                }
                            >
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
