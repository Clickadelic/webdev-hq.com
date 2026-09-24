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
		$user = User::where('email', 'marketing-admin@clickadelic.de')->firstOrFail();
		$team = Team::where('slug', 'marketing')->firstOrFail();

		Tag::updateOrCreate(
			['slug' => 'php'],
			[
				'name' => 'PHP',
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
	}
}
