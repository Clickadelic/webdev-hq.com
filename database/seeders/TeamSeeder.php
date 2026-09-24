<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
	public function run(): void
	{
		$teams = [
			[
				'name' => 'Marketing',
				'slug' => 'marketing',
				'owner' => 'marketing-admin@clickadelic.de',
				'members' => [
					'marketing-admin@clickadelic.de',
					'marketing-member@clickadelic.de',
				],
			],
			[
				'name' => 'Engineering',
				'slug' => 'engineering',
				'owner' => 'engineering-admin@clickadelic.de',
				'members' => [
					'engineering-admin@clickadelic.de',
					'engineering-member@clickadelic.de',
				],
			],
		];

		foreach ($teams as $teamData) {
			$owner = User::where('email', $teamData['owner'])->firstOrFail();
			$team = Team::updateOrCreate(
				['slug' => $teamData['slug']],
				[
					'name' => $teamData['name'],
					'owner_id' => $owner->id,
				],
			);

			$memberIds = User::whereIn('email', $teamData['members'])->pluck('id');
			$team->members()->sync($memberIds);
		}
	}
}
