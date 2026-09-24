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
		$user = User::where('email', 'marketing-admin@clickadelic.de')->firstOrFail();
		$team = Team::where('slug', 'marketing')->firstOrFail();

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
