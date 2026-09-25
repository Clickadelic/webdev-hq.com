import PublicTitle from '@/components/public-title';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { type Paginator, type Post } from '@/types';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

export default function PostsIndex({
    posts,
    canRegister = true,
}: {
    posts: Paginator<Post>;
    canRegister?: boolean;
}) {
    return (
        <PublicLayout title="Posts" canRegister={canRegister}>
            <PublicTitle title="Posts" />

            {posts.data.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                    No posts have been published yet.
                </div>
            ) : (
                <div className="py-8">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {posts.data.map((post) => (
                            <article
                                key={post.id}
                                className="flex min-h-72 flex-col overflow-hidden rounded-lg border border-border bg-background"
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
                                                {new Date(
                                                    post.published_at,
                                                ).toLocaleDateString()}
                                            </time>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-semibold">
                                            {post.title}
                                        </h2>
                                        {(post.description || post.subline) && (
                                            <p className="line-clamp-3 text-sm text-muted-foreground">
                                                {post.description ??
                                                    post.subline}
                                            </p>
                                        )}
                                    </div>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mt-auto flex flex-wrap gap-2 text-xs text-primary">
                                            {post.tags.map((tag) => (
                                                <span key={tag.id}>
                                                    #{tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    {posts.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!posts.prev_page_url}
                                onClick={() =>
                                    posts.prev_page_url &&
                                    router.get(posts.prev_page_url)
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
                                    posts.next_page_url &&
                                    router.get(posts.next_page_url)
                                }
                            >
                                Next
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </PublicLayout>
    );
}
