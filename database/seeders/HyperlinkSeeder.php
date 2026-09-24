<?php

namespace Database\Seeders;

use App\Enums\Status;
use App\Models\Category;
use App\Models\Hyperlink;
use App\Models\Tag;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class HyperlinkSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$user = User::where('email', 'batman@clickadelic.de')->firstOrFail();
		$category = Category::where('slug', 'web-development')->firstOrFail();
		$tag = Tag::where('slug', 'laravel')->firstOrFail();
		$team = Team::where('slug', 'marketing')->firstOrFail();

		// Laravel
		$laravel = Hyperlink::updateOrCreate(
			['url' => 'https://laravel.com/docs'],
			[
				'title' => 'Laravel Documentation',
				'favicon_url' => 'https://laravel.com/favicon.ico',
				'description' => 'The official Laravel documentation.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$laravel->tags()->syncWithoutDetaching([$tag->id]);

		// W3C
		$w3cHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://www.w3.org/'],
			[
				'title' => 'W3C Web Standards',
				'favicon_url' => 'https://www.w3.org/favicon.ico',
				'description' => 'The World Wide Web Consortium develops open web standards.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$w3cHyperlink->tags()->syncWithoutDetaching([$tag->id]);

		// MDN Web Docs
		$mdnHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://developer.mozilla.org/'],
			[
				'title' => 'MDN Web Docs',
				'favicon_url' => 'https://developer.mozilla.org/favicon.ico',
				'description' => 'Comprehensive documentation for web technologies provided by Mozilla.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$mdnHyperlink->tags()->syncWithoutDetaching([$tag->id]);

		// Marko
		$markoHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://marko.build/'],
			[
				'title' => 'Marko',
				'favicon_url' => 'https://marko.build/favicon.svg',
				'description' => 'A friendly and fast UI library for building web applications.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$markoHyperlink->tags()->syncWithoutDetaching([$tag->id]);
	}
}
