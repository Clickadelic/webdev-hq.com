<?php

namespace Database\Seeders;

use App\Enums\Status;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
	public function run(): void
	{
		$user = User::where('email', 'marketing-admin@clickadelic.de')->firstOrFail();
		$category = Category::where('slug', 'web-development')->firstOrFail();
		$tag = Tag::where('slug', 'php')->firstOrFail();
		$team = Team::where('slug', 'marketing')->firstOrFail();

		$post = Post::updateOrCreate(
			['slug' => 'getting-started-with-laravel'],
			[
				'title' => 'Getting Started with Laravel',
				'subline' => 'Build your first Laravel application.',
				'description' => 'A short introduction to building an application with Laravel.',
				'content' => 'Laravel gives you expressive tools for building modern web applications.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'published_at' => now(),
				'created_by' => $user->id,
				'team_id' => $team->id,
				'meta_title' => 'Getting Started with Laravel',
				'meta_description' => 'Learn the basics of building a Laravel application.',
			],
		);

		$post->tags()->syncWithoutDetaching([$tag->id]);
	}
}
