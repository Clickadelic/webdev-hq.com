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
		$user = User::query()->where('email', 'batman@clickadelic.de')->firstOrFail();
		$category = Category::query()->where('slug', 'web-development')->firstOrFail();
		$tag = Tag::query()->where('slug', 'php')->firstOrFail();
		$team = Team::query()->where('slug', 'marketing')->firstOrFail();

		$post = Post::updateOrCreate(
			['slug' => 'getting-started-with-webdev-hq'],
			[
				'title' => 'Getting Started with WebDev HQ',
				'subline' => 'What\'s the deal with WebDev HQ?',
				'description' => 'WebDev HQ mainly is a resource and inspirational platform for your next project.',
				'content' => 'WebDev HQ gives you the resources and inspiration to kickstart your next web development project.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'published_at' => now(),
				'created_by' => $user->id,
				'team_id' => $team->id,
				'meta_title' => 'Getting Started with WebDev HQ',
				'meta_description' => 'Learn how to get started with WebDev HQ.',
			],
		);

		$post->tags()->syncWithoutDetaching([$tag->id]);
	}
}
