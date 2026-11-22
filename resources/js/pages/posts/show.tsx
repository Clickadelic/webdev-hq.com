import PublicLayout from '@/layouts/public-layout';
import PostsSidebar from '@/layouts/public-layout/sidebars/posts-sidebar';
import { type Post } from '@/types';
export default function PostsShow({ post, canRegister = true }: { post: Post; canRegister?: boolean }) {
    return (
        <PublicLayout title={post.title} showTitle={true} canRegister={canRegister} leftSidebar={<PostsSidebar />}>
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <h4 className="mb-5 text-base font-medium text-muted-foreground">{post.subline}</h4>
            <h3>written by: {post.author?.name}</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {post.category && <span className="rounded border border-primary/20 bg-primary/10 px-2 py-1 font-medium text-primary">{post.category.name}</span>}
                {post.published_at && <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString()}</time>}
            </div>
            <p>{post.content}</p>
            <ul>
                {post.tags?.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                ))}
            </ul>
        </PublicLayout>
    );
}
