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
		$team = Team::query()->where('slug', 'marketing')->firstOrFail();
		$user = User::query()->where('email', 'batman@clickadelic.de')->firstOrFail();
		$category = Category::query()->where('slug', 'web-development')->firstOrFail();
		$javascriptTag = Tag::query()->where('slug', 'javascript')->firstOrFail();
		$phpTag = Tag::query()->where('slug', 'php')->firstOrFail();

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

		$w3cHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		// Webstatus Dev
		$webstatusDevHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://webstatus.dev/'],
			[
				'title' => 'Webstatus Dev',
				'favicon_url' => 'https://webstatus.dev/public/img/favicon.png',
				'description' => 'A platform for monitoring the status of current web implementations.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$webstatusDevHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

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

		$mdnHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		// Symfony
		$symfony = Hyperlink::updateOrCreate(
			['url' => 'https://symfony.com'],
			[
				'title' => 'Symfony',
				'favicon_url' => 'https://symfony.com/favicons/favicon.svg',
				'description' => 'Build with confidence at any scale.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$symfony->tags()->syncWithoutDetaching([$phpTag->id]);

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

		$laravel->tags()->syncWithoutDetaching([$phpTag->id]);

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

		$markoHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		// Tempest
		$tempestHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://tempestphp.com/'],
			[
				'title' => 'Tempest',
				'favicon_url' => 'https://tempestphp.com/favicon/favicon-32x32.png',
				'description' => 'The framework that gets out of your way.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$tempestHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		// Yii
		$yiiHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://www.yiiframework.com/'],
			[
				'title' => 'Yii Framework',
				'favicon_url' => 'https://www.yiiframework.com/favico/favicon.ico',
				'description' => 'PHP framework for rapid development of modern applications.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$yiiHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		// Jamstack
		$jamstackHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://jamstack.org/'],
			[
				'title' => 'Jamstack',
				'favicon_url' => 'https://jamstack.org/img/favicons/favicon-32x32.png',
				'description' => 'Jamstack is an architectural approach that decouples the web experience layer from data and business logic, improving flexibility, scalability, performance, and maintainability.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$jamstackHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		// Web Features Explorer
		$webFeaturesExplorerHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://web-platform-dx.github.io/web-features-explorer/'],
			[
				'title' => 'Web Features Explorer',
				'favicon_url' => 'https://web-platform-dx.github.io/web-features-explorer/assets/img/webdx-notext.svg',
				'description' => 'Explore the capabilities of modern web platforms and APIs.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$webFeaturesExplorerHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		// Zend Framework
		$zend = Hyperlink::updateOrCreate(
			['url' => 'https://zend.com/'],
			[
				'title' => 'Zend Framework',
				'favicon_url' => 'https://zend.com/favicon.ico',
				'description' => 'Mission-Critical PHP Made Possible.',
				'category_id' => $category->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$zend->tags()->syncWithoutDetaching([$phpTag->id]);
	}
}
