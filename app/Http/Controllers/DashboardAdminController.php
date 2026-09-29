<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardAdminController extends Controller
{
	public function index(): Response
	{
		return Inertia::render('dashboard/admin/index', [
			'stats' => [
				'usersCount' => User::query()->count(),
				'teamsCount' => Team::query()->count(),
			],
		]);
	}

	public function users(): Response
	{
		$users = User::query()
			->withCount('teams')
			->orderBy('name')
			->get(['id', 'name', 'email', 'email_verified_at'])
			->map(fn(User $user): array => [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'email_verified_at' => $user->email_verified_at,
				'teams_count' => $user->teams_count,
				'is_platform_admin' => $user->isPlatformAdmin(),
			]);

		return Inertia::render('dashboard/admin/users', [
			'users' => $users,
		]);
	}

	public function teams(): Response
	{
		$teams = Team::query()
			->with('owner:id,name,email')
			->withCount('members')
			->orderBy('name')
			->get()
			->map(fn(Team $team): array => [
				'id' => $team->id,
				'name' => $team->name,
				'slug' => $team->slug,
				'owner' => [
					'id' => $team->owner->id,
					'name' => $team->owner->name,
					'email' => $team->owner->email,
				],
				'members_count' => $team->members_count,
			]);

		return Inertia::render('dashboard/admin/teams/index', [
			'teams' => $teams,
		]);
	}

	public function teamMembers(Team $team): Response
	{
		return Inertia::render('dashboard/admin/teams/show', [
			'team' => [
				'id' => $team->id,
				'name' => $team->name,
				'slug' => $team->slug,
			],
			'members' => $team->membersWithOwner(),
		]);
	}
}
