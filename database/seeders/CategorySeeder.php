<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$user = User::query()->where('email', 'batman@clickadelic.de')->firstOrFail();
		$team = Team::query()->where('slug', 'marketing')->firstOrFail();

		// Backend
		Category::updateOrCreate(
			['slug' => 'backend'],
			[
				'name' => 'Backend',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Browser
		Category::updateOrCreate(
			['slug' => 'browser'],
			[
				'name' => 'Browser',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Open Source
		Category::updateOrCreate(
			['slug' => 'open-source'],
			[
				'name' => 'Open Source',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Web Development
		Category::updateOrCreate(
			['slug' => 'web-development'],
			[
				'name' => 'Web Development',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Frontend
		Category::updateOrCreate(
			['slug' => 'frontend'],
			[
				'name' => 'Frontend',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Fullstack
		Category::updateOrCreate(
			['slug' => 'fullstack'],
			[
				'name' => 'Fullstack',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
	}
}
