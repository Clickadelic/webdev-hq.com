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
			['slug' => 'full-stack'],
			[
				'name' => 'Full-Stack',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// DevOps
		Category::updateOrCreate(
			['slug' => 'dev-ops'],
			[
				'name' => 'DevOps',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Performance
		Category::updateOrCreate(
			['slug' => 'performance'],
			[
				'name' => 'Performance',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Tooling
		Category::updateOrCreate(
			['slug' => 'tooling'],
			[
				'name' => 'Tooling',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// CMS
		Category::updateOrCreate(
			['slug' => 'cms'],
			[
				'name' => 'CMS',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Icons
		Category::updateOrCreate(
			['slug' => 'icons'],
			[
				'name' => 'Icons',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Design
		Category::updateOrCreate(
			['slug' => 'design'],
			[
				'name' => 'Design',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Mobile
		Category::updateOrCreate(
			['slug' => 'mobile'],
			[
				'name' => 'Design',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// Security
		Category::updateOrCreate(
			['slug' => 'security'],
			[
				'name' => 'Security',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);

		// WebDev
		Category::updateOrCreate(
			['slug' => 'web-development'],
			[
				'name' => 'Web Development',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
	}
}
