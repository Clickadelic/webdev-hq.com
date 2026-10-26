import PublicLayout from '@/layouts/public-layout';
import { usePage } from '@inertiajs/react';
import { type Post } from '@/types';
import PostsSidebar from '@/layouts/public-layout/sidebars/posts-sidebar';
export default function PostsShow({
	post,
	canRegister = true,
}: {
	post: Post;
	canRegister?: boolean;
}) {
	const page = usePage();

    console.log(page.props); // Alle Inertia-Props
	return (
		<PublicLayout title={post.title} showTitle={true} canRegister={canRegister} leftSidebar={<PostsSidebar />}>
			<h3 className="text-lg font-semibold">{post.subline}</h3>
			<h3>written by: {post.author?.name}</h3>
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
			<p>{post.content}</p>
			<ul>
				{post.tags?.map(tag => (
					<li key={tag.id}>{tag.name}</li>
				))}
			</ul>
		</PublicLayout>
	);
}
