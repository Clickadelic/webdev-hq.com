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

		// Categories
		$backendCategory = Category::query()->where('slug', 'backend')->firstOrFail();
		$browserCategory = Category::query()->where('slug', 'browser')->firstOrFail();
		$openSourceCategory = Category::query()->where('slug', 'open-source')->firstOrFail();
		$frontendCategory = Category::query()->where('slug', 'frontend')->firstOrFail();
		$fullStackCategory = Category::query()->where('slug', 'full-stack')->firstOrFail();
		$devOpsCategory = Category::query()->where('slug', 'dev-ops')->firstOrFail();
		$toolingCategory = Category::query()->where('slug', 'tooling')->firstOrFail();
		$cmsCategory = Category::query()->where('slug', 'cms')->firstOrFail();
		$iconsCategory = Category::query()->where('slug', 'icons')->firstOrFail();
		$designCategory = Category::query()->where('slug', 'design')->firstOrFail();
		$mobileCategory = Category::query()->where('slug', 'mobile')->firstOrFail();
		$securityCategory = Category::query()->where('slug', 'security')->firstOrFail();
		$performanceCategory = Category::query()->where('slug', 'performance')->firstOrFail();
		$webdevCategory = Category::query()->where('slug', 'web-development')->firstOrFail();

		// Tags
		$htmlTag = Tag::query()->where('slug', 'html')->firstOrFail();
		$cssTag = Tag::query()->where('slug', 'css')->firstOrFail();
		$javascriptTag = Tag::query()->where('slug', 'javascript')->firstOrFail();
		$phpTag = Tag::query()->where('slug', 'php')->firstOrFail();
		$reactTag = Tag::query()->where('slug', 'react')->firstOrFail();
		$angularTag = Tag::query()->where('slug', 'angular')->firstOrFail();
		$vueTag = Tag::query()->where('slug', 'vue')->firstOrFail();
		$svelteTag = Tag::query()->where('slug', 'svelte')->firstOrFail();
		$tailwindTag = Tag::query()->where('slug', 'tailwind')->firstOrFail();
		$bootstrapTag = Tag::query()->where('slug', 'bootstrap')->firstOrFail();
		$laravelTag = Tag::query()->where('slug', 'laravel')->firstOrFail();
		$nodeJsTag = Tag::query()->where('slug', 'node-js')->firstOrFail();
		$goLangTag = Tag::query()->where('slug', 'go-lang')->firstOrFail();
		$pythonTag = Tag::query()->where('slug', 'python')->firstOrFail();
		$javaTag = Tag::query()->where('slug', 'java')->firstOrFail();
		$openSourceTag = Tag::query()->where('slug', 'open-source')->firstOrFail();
		$symfonyTag = Tag::query()->where('slug', 'symfony')->firstOrFail();


		// W3C
		$bulmaHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://bulma.io/'],
			[
				'title' => 'Bulma',
				'favicon_url' => 'https://bulma.io/favicons/favicon-32x32.png?v=201701041855',
				'description' => 'The Modern CSS Framework.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$bulmaHyperlink->tags()->syncWithoutDetaching([$cssTag->id]);

		// W3C
		$nextcloudHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://nextcloud.com/'],
			[
				'title' => 'Nextcloud',
				'favicon_url' => 'https://nextcloud.com/c/uploads/2022/03/favicon.png',
				'description' => 'Regain control over your data.',
				'category_id' => $openSourceCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$nextcloudHyperlink->tags()->syncWithoutDetaching([$openSourceTag->id]);

		// Paperless
		$paperlessHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://docs.paperless-ngx.com/'],
			[
				'title' => 'Paperless-ngx',
				'favicon_url' => 'https://docs.paperless-ngx.com/_static/favicon-32x32.png',
				'description' => 'A document management system for your digital files.',
				'category_id' => $openSourceCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$paperlessHyperlink->tags()->syncWithoutDetaching([$openSourceTag->id]);

		// W3C
		$w3cHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://www.w3.org/'],
			[
				'title' => 'W3C Web Standards',
				'favicon_url' => 'https://www.w3.org/favicon.ico',
				'description' => 'The World Wide Web Consortium develops open web standards.',
				'category_id' => $webdevCategory->id,
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
				'category_id' => $webdevCategory->id,
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
				'category_id' => $webdevCategory->id,
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
				'category_id' => $backendCategory->id,
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
				'category_id' => $fullStackCategory->id,
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
				'category_id' => $fullStackCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$markoHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		// CodeIgniter
		$codeIgniterHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://codeigniter.com/'],
			[
				'title' => 'CodeIgniter',
				'favicon_url' => 'https://codeigniter.com/favicon.ico',
				'description' => 'The small framework with powerful features.',
				'category_id' => $backendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$codeIgniterHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		// Tempest
		$tempestHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://tempestphp.com/'],
			[
				'title' => 'Tempest',
				'favicon_url' => 'https://tempestphp.com/favicon/favicon-32x32.png',
				'description' => 'The framework that gets out of your way.',
				'category_id' => $backendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$tempestHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		$bootstrapHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://getbootstrap.com/'],
			[
				'title' => 'Bootstrap',
				'favicon_url' => 'https://getbootstrap.com/favicon.ico',
				'description' => 'The most popular HTML, CSS, and JS library in the world.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$bootstrapHyperlink->tags()->syncWithoutDetaching([$cssTag->id]);

		// Yii
		$yiiHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://www.yiiframework.com/'],
			[
				'title' => 'Yii Framework',
				'favicon_url' => 'https://www.yiiframework.com/favico/favicon.ico',
				'description' => 'PHP framework for rapid development of modern applications.',
				'category_id' => $backendCategory->id,
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
				'category_id' => $webdevCategory->id,
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
				'favicon_url' => 'https://web-platform-dx.github.io/assets/img/webdx-notext.svg',
				'description' => 'Explore the capabilities of modern web platforms and APIs.',
				'category_id' => $webdevCategory->id,
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
				'favicon_url' => 'https://zend.com/themes/custom/p4base/assets/favicons/znd/favicon.ico',
				'description' => 'Mission-Critical PHP Made Possible.',
				'category_id' => $backendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$zend->tags()->syncWithoutDetaching([$phpTag->id]);

		$shodanHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://shodan.io/'],
			[
				'title' => 'Shodan',
				'favicon_url' => 'https://www.shodan.io/favicon.ico',
				'description' => 'Shodan is a search engine for Internet-connected devices.',
				'category_id' => $webdevCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		$shodanHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);
	}
}
