<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str; // <-- Hier einfügen

class UserSeeder extends Seeder
{
	public function run(): void
	{
		User::create([
			'id' => Str::uuid(),
			'name' => 'Clickadelic',
			'email' => 'click@clickadelic.de',
			'email_verified_at' => now(),
			'password' => bcrypt('forello204$'),
		]);
	}
}
