<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
	public function run(): void
	{
		$users = [
			['name' => 'Batman', 'email' => 'batman@clickadelic.de'],
			['name' => 'Demo User', 'email' => 'demo@clickadelic.de'],
			['name' => 'Global Admin', 'email' => 'admin@clickadelic.de'],
			['name' => 'Marketing Team Admin', 'email' => 'marketing-admin@clickadelic.de'],
			['name' => 'Marketing Team Member', 'email' => 'marketing-member@clickadelic.de'],
			['name' => 'Engineering Team Admin', 'email' => 'engineering-admin@clickadelic.de'],
			['name' => 'Engineering Team Member', 'email' => 'engineering-member@clickadelic.de'],
		];

		foreach ($users as $user) {
			User::updateOrCreate(
				['email' => $user['email']],
				[
					'name' => $user['name'],
					'email_verified_at' => now(),
					'password' => bcrypt('forello204$'),
				],
			);
		}
	}
}
