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
		$testingTag = Tag::query()->where('slug', 'testing')->firstOrFail();


		// TailWind Grid Generator
		$folgeToolsHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://folge.me/tools'],
			[
				'title' => 'TailWind Grid Generator',
				'favicon_url' => 'https://www.tailwindgen.com/favicon.ico',
				'description' => 'Collection of free online tools, all private and running only in your browser.',
				'category_id' => $toolingCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$folgeToolsHyperlink->tags()->syncWithoutDetaching([$cssTag->id]);

		// Keystone
		$keystoneHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://keystonejs.com/'],
			[
				'title' => 'KeystoneJS',
				'favicon_url' => 'https://keystonejs.com/favicon-32x32.png',
				'description' => 'The superpowered CMS for developers.',
				'category_id' => $cmsCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$keystoneHyperlink->tags()->syncWithoutDetaching([$nodeJsTag->id]);

		// Skeleton CSS
		$skeletonHyperlink = Hyperlink::updateOrCreate(
			['url' => 'http://getskeleton.com/'],
			[
				'title' => 'Skeleton CSS',
				'favicon_url' => 'http://getskeleton.com/dist/images/favicon.png',
				'description' => 'A dead simple, responsive boilerplate.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$skeletonHyperlink->tags()->syncWithoutDetaching([$cssTag->id]);

		// Pico CSS
		$picoHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://picocss.com'],
			[
				'title' => 'Pico CSS',
				'favicon_url' => 'https://picocss.com/favicon-32x32.png',
				'description' => 'A minimal CSS Framework for Semantic HTML.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$picoHyperlink->tags()->syncWithoutDetaching([$cssTag->id]);

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
				'favicon_url' => 'https://docs.paperless-ngx.com/assets/favicon.png',
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
		$bootstrapHyperlink->tags()->syncWithoutDetaching([$bootstrapTag->id, $cssTag->id, $javascriptTag->id]);

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
				'description' => 'An architectural approach that decouples the web experience layer.',
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
				'favicon_url' => 'https://www.shodan.io/static/img/favicon.png',
				'description' => 'Shodan is a search engine for Internet-connected devices.',
				'category_id' => $webdevCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$shodanHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$playwrightHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://playwright.dev/'],
			[
				'title' => 'Playwright',
				'favicon_url' => 'https://playwright.dev/img/playwright-logo.ico',
				'description' => 'Playwright is a Node.js library to automate Chromium, Firefox and WebKit with a single API.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$playwrightHyperlink->tags()->syncWithoutDetaching([$testingTag->id]);

		$frankenHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://frankenphp.com/'],
			[
				'title' => 'FrankenPHP',
				'favicon_url' => 'https://frankenphp.dev/favicon.ico',
				'description' => 'FrankenPHP is a high-performance PHP runtime.',
				'category_id' => $backendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$frankenHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		$caddyHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://caddyserver.com/'],
			[
				'title' => 'Caddy Server',
				'favicon_url' => 'https://caddyserver.com/resources/images/favicon.png?v=a49be19',
				'description' => 'Caddy is a powerful, enterprise-ready, open source web server with automatic HTTPS.',
				'category_id' => $backendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$caddyHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		$wxtHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://wxt.dev/'],
			[
				'title' => 'WXT',
				'favicon_url' => 'https://wxt.dev/favicon.ico',
				'description' => 'Next-gen Web Extension Framework.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$wxtHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$webfontsHelperHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://gwfh.mranftl.com/fonts'],
			[
				'title' => 'Google Webfonts Helper',
				'favicon_url' => 'https://gwfh.mranftl.com/favicon.ico',
				'description' => 'Google Webfonts Helper allows you to self-host Google Fonts easily.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$webfontsHelperHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$typescriptHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://www.typescriptlang.org/'],
			[
				'title' => 'TypeScript',
				'favicon_url' => 'https://www.typescriptlang.org/favicon-32x32.png',
				'description' => 'TypeScript is a strongly typed programming language that builds on JavaScript.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$typescriptHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$googleFontsHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://fonts.google.com/'],
			[
				'title' => 'Google Fonts',
				'favicon_url' => 'https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/favicon.svg',
				'description' => 'Google Fonts is a library of free licensed font families and APIs for using the fonts via CSS and Android.',
				'category_id' => $designCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$googleFontsHyperlink->tags()->syncWithoutDetaching([$cssTag->id]);

		$lucideHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://lucide.dev'],
			[
				'title' => 'Lucide Pencil Icon',
				'favicon_url' => 'https://lucide.dev/favicon.ico',
				'description' => 'Beautiful & consistent icons. Made by the community.',
				'category_id' => $iconsCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$lucideHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id, $reactTag->id]);

		$bunHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://bun.com/'],
			[
				'title' => 'Bun',
				'favicon_url' => 'https://bun.com/favicon.ico',
				'description' => 'Bun is a fast all-in-one JavaScript runtime.',
				'category_id' => $toolingCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$bunHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$denoHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://deno.com/'],
			[
				'title' => 'Deno',
				'favicon_url' => 'https://deno.com/favicon.ico',
				'description' => 'Deno is a secure runtime for JavaScript and TypeScript.',
				'category_id' => $toolingCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$denoHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$svelteHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://svelte.dev/'],
			[
				'title' => 'Svelte',
				'favicon_url' => 'https://svelte.dev/favicon.png',
				'description' => 'Svelte is a radical new approach to building user interfaces.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$svelteHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id, $cssTag->id]);

		$twigHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://twig.symfony.com/'],
			[
				'title' => 'Twig',
				'favicon_url' => 'https://twig.symfony.com/favicon-32x32.png',
				'description' => 'Twig is a flexible, fast, and secure template engine for PHP.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$twigHyperlink->tags()->syncWithoutDetaching([$symfonyTag->id, $phpTag->id]);

		$bladeHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://laravel.com/docs/blade'],
			[
				'title' => 'Blade',
				'favicon_url' => 'https://laravel.com/favicon.ico',
				'description' => 'Blade is the simple, yet powerful templating engine provided with Laravel.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$bladeHyperlink->tags()->syncWithoutDetaching([$phpTag->id]);

		$expressHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://expressjs.com/'],
			[
				'title' => 'Express',
				'favicon_url' => 'https://expressjs.com/favicon.ico',
				'description' => 'Express is a fast, unopinionated, minimalist web framework for Node.js.',
				'category_id' => $backendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$expressHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$nodeJsHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://nodejs.org/'],
			[
				'title' => 'Node.js',
				'favicon_url' => 'https://nodejs.org/static/favicon.ico',
				'description' => 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
				'category_id' => $backendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$nodeJsHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$reactIconsHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://react-icons.github.io/react-icons/'],
			[
				'title' => 'React Icons',
				'favicon_url' => 'https://react-icons.github.io/react-icons/favicon-32x32.png',
				'description' => 'React Icons is a library that provides popular icons as React components.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$reactIconsHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$astroHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://astro.build/'],
			[
				'title' => 'Astro',
				'favicon_url' => 'https://astro.build/favicon.svg',
				'description' => 'Astro is a modern static site builder for the web.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$astroHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$alpinejsHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://alpinejs.dev/'],
			[
				'title' => 'Alpine.js',
				'favicon_url' => 'https://alpinejs.dev/favicon.png',
				'description' => 'Alpine.js is a rugged, minimal framework for composing JavaScript behavior in your markup.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$alpinejsHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$htmxHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://htmx.org/'],
			[
				'title' => 'htmx',
				'favicon_url' => 'https://htmx.org/favicon.svg',
				'description' => 'htmx allows you to access modern browser features directly from HTML, without writing JavaScript.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$htmxHyperlink->tags()->syncWithoutDetaching([$htmlTag->id, $javascriptTag->id]);

		$solidHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://www.solidjs.com/'],
			[
				'title' => 'SolidJS',
				'favicon_url' => 'https://www.solidjs.com/img/favicons/apple-touch-icon.png',
				'description' => 'SolidJS is a declarative JavaScript library for building user interfaces.',
				'category_id' => $frontendCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$solidHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$zohoHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://www.zoho.com/'],
			[
				'title' => 'Zoho',
				'favicon_url' => 'https://www.zoho.com/favicon.ico',
				'description' => 'Zoho offers a suite of online productivity tools and SaaS applications.',
				'category_id' => $cmsCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$zohoHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$webpackHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://webpack.js.org/'],
			[
				'title' => 'Webpack',
				'favicon_url' => 'https://webpack.js.org/favicon-32x32.png',
				'description' => 'Webpack is a static module bundler for modern JavaScript applications.',
				'category_id' => $toolingCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$webpackHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);


		$rollupHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://rollupjs.org/'],
			[
				'title' => 'Rollup',
				'favicon_url' => 'https://rollupjs.org/favicon-32x32.png',
				'description' => 'Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex.',
				'category_id' => $toolingCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$rollupHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);

		$rolldownHyperlink = Hyperlink::updateOrCreate(
			['url' => 'https://rolldown.rs/'],
			[
				'title' => 'Rolldown',
				'favicon_url' => 'https://rolldown.rs/logo-without-border.svg',
				'description' => 'Rolldown is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex.',
				'category_id' => $toolingCategory->id,
				'status' => Status::Published,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		$rolldownHyperlink->tags()->syncWithoutDetaching([$javascriptTag->id]);
	}
}
