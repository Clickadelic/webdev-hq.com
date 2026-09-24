<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
	public function run(): void
	{
		$registrar = app(PermissionRegistrar::class);
		$admin = User::where('email', 'admin@clickadelic.de')->firstOrFail();

		foreach (Team::all() as $team) {
			$registrar->setPermissionsTeamId($team->id);

			$adminRole = Role::firstOrCreate([
				'name' => 'admin',
				'guard_name' => 'web',
				'team_id' => $team->id,
			]);
			$teamAdminRole = Role::firstOrCreate([
				'name' => 'team-admin',
				'guard_name' => 'web',
				'team_id' => $team->id,
			]);
			$teamMemberRole = Role::firstOrCreate([
				'name' => 'team-member',
				'guard_name' => 'web',
				'team_id' => $team->id,
			]);

			$admin->syncRoles([$adminRole]);
			$team->members
				->filter(fn(User $user) => str_ends_with($user->email, '-admin@clickadelic.de'))
				->each(fn(User $user) => $user->syncRoles([$teamAdminRole]));
			$team->members
				->filter(fn(User $user) => str_ends_with($user->email, '-member@clickadelic.de'))
				->each(fn(User $user) => $user->syncRoles([$teamMemberRole]));
		}
	}
}
