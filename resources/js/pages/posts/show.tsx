import PublicLayout from '@/layouts/public-layout';
import { usePage } from '@inertiajs/react';
import { type Post } from '@/types';

export default function PostsShow({
	post,
	canRegister = true,
}: {
	post: Post;
	canRegister?: boolean;
}) {
	const page = usePage();

    console.log(page.props); // Alle Inertia-Props
    console.log(page.url);   // Aktuelle URL
	return (
		<PublicLayout title={post.title} showTitle={true} canRegister={canRegister}>
			<p>{post.content}</p>
		</PublicLayout>
	);
}
