<?php

namespace Database\Seeders;

use App\Models\App as AppModel;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class AppSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$user = User::query()->where('email', 'batman@clickadelic.de')->firstOrFail();
		$team = Team::query()->where('slug', 'marketing')->firstOrFail();

		AppModel::updateOrCreate(
			['url' => 'https://mail.google.com'],
			[
				'title' => 'G-Mail',
				'favicon_url' => 'https://mail.google.com/favicon.ico',
				'target' => '_blank',
				'position' => 1,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		AppModel::updateOrCreate(
			['url' => 'https://drive.google.com'],
			[
				'title' => 'Google Drive',
				'favicon_url' => 'https://drive.google.com/favicon.ico',
				'target' => '_blank',
				'position' => 2,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
		AppModel::updateOrCreate(
			['url' => 'https://docs.google.com'],
			[
				'title' => 'Google Docs',
				'favicon_url' => 'https://docs.google.com/favicon.ico',
				'target' => '_blank',
				'position' => 3,
				'created_by' => $user->id,
				'team_id' => $team->id,
			],
		);
	}
}
