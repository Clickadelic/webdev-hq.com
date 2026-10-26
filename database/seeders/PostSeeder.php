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
		$webdevCategory = Category::query()->where('slug', 'web-development')->firstOrFail();
		$backendCategory = Category::query()->where('slug', 'backend')->firstOrFail();
		$frontendCategory = Category::query()->where('slug', 'frontend')->firstOrFail();
		$tag = Tag::query()->where('slug', 'php')->firstOrFail();
		$team = Team::query()->where('slug', 'marketing')->firstOrFail();

		$firstPost = Post::updateOrCreate(
			['slug' => 'getting-started-with-webdev-hq'],
			[
				'title' => 'Getting Started with WebDev HQ',
				'subline' => 'What\'s the deal with WebDev HQ?',
				'description' => 'WebDev HQ gives you the resources and inspiration to kickstart your next web development project and other goals in this area for a long description.',
				'content' => 'WebDev HQ gives you the resources and inspiration to kickstart your next web development project and other goals in this area for a long description.',
				'category_id' => $backendCategory->id,
				'status' => Status::Published,
				'published_at' => now(),
				'created_by' => $user->id,
				'team_id' => $team->id,
				'meta_title' => 'Getting Started with WebDev HQ',
				'meta_description' => 'Learn how to get started with WebDev HQ.',
			],
		);

		$firstPost->tags()->syncWithoutDetaching([$tag->id]);

		$secondPost = Post::updateOrCreate(
			['slug' => 'why-all-these-links'],
			[
				'title' => 'Why All These Links?',
				'subline' => 'Best resources at a glance?',
				'description' => 'Who needs it, and why is it useful?',
				'content' => 'The resources mainly represent a collection of useful links for web developers and alike.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'published_at' => now(),
				'created_by' => $user->id,
				'team_id' => $team->id,
				'meta_title' => 'Why All These Links?',
				'meta_description' => 'Discover the purpose behind all the links on WebDev HQ.',
			],
		);

		$secondPost->tags()->syncWithoutDetaching([$tag->id]);

		$thirdPost = Post::updateOrCreate(
			['slug' => 'another-one-bites-the-dust'],
			[
				'title' => 'Another One Bites the Dust, and so on and so forth for long titles.',
				'subline' => 'and another one bites the dust, hey!',
				'description' => 'One prime, one goal?',
				'content' => 'One golden badge - it\'s a kind of magic, isn\'t it?',
				'category_id' => $webdevCategory->id,
				'status' => Status::Published,
				'published_at' => now(),
				'created_by' => $user->id,
				'team_id' => $team->id,
				'meta_title' => 'Another One Bites the Dust',
				'meta_description' => 'Discover the purpose behind all the links on WebDev HQ.',
			],
		);

		$thirdPost->tags()->syncWithoutDetaching([$tag->id]);
	}
}
