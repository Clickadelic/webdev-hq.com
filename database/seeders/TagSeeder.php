<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$user = User::query()->where('email', 'batman@clickadelic.de')->firstOrFail();
		$team = Team::query()->where('slug', 'marketing')->firstOrFail();

		// Tags
		Tag::updateOrCreate(
			['slug' => 'html'],
			[
				'name' => 'HTML',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'css'],
			[
				'name' => 'CSS',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);


		Tag::updateOrCreate(
			['slug' => 'javascript'],
			[
				'name' => 'JavaScript',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'php'],
			[
				'name' => 'PHP',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'angular'],
			[
				'name' => 'Angular',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'react'],
			[
				'name' => 'React',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'vue'],
			[
				'name' => 'Vue',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'svelte'],
			[
				'name' => 'Svelte',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'tailwind'],
			[
				'name' => 'Tailwind',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'bootstrap'],
			[
				'name' => 'Bootstrap',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'laravel'],
			[
				'name' => 'Laravel',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'symfony'],
			[
				'name' => 'Symfony',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'view-engines'],
			[
				'name' => 'View Engines',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'node-js'],
			[
				'name' => 'Node.js',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'database'],
			[
				'name' => 'Database',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'go-lang'],
			[
				'name' => 'GoLang',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'python'],
			[
				'name' => 'Python',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'java'],
			[
				'name' => 'Java',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'open-source'],
			[
				'name' => 'Open Source',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		Tag::updateOrCreate(
			['slug' => 'javascript'],
			[
				'name' => 'JavaScript',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		Tag::updateOrCreate(
			['slug' => 'testing'],
			[
				'name' => 'Testing',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
	}
}
