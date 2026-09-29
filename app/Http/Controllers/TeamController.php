<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddTeamMemberRequest;
use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
	public function index(): Response
	{
		$user = request()->user();
		$teams = Team::query()
			->withCount('members')
			->where(function ($query) use ($user): void {
				$query->where('owner_id', $user->id)
					->orWhereHas('members', fn($members) => $members->whereKey($user->id));
			})
			->orderBy('name')
			->get()
			->map(fn(Team $team): array => [
				...$this->teamData($team),
				'members_count' => $team->members_count,
				'can_manage' => (string) $user->id === (string) $team->owner_id,
			]);

		return Inertia::render('teams/index', [
			'teams' => $teams,
		]);
	}

	public function store(StoreTeamRequest $request): RedirectResponse
	{
		$team = DB::transaction(function () use ($request): Team {
			$user = $request->user();
			$name = $request->validated('name');

			$team = Team::query()->create([
				'owner_id' => $user->id,
				'name' => $name,
				'slug' => $this->uniqueSlug($name),
			]);

			$team->members()->attach($user);

			return $team;
		});

		return to_route('teams.edit', $team);
	}

	public function edit(Team $team): Response
	{
		abort_unless(request()->user()?->canManageTeam($team), 403);

		return Inertia::render('teams/edit', [
			'team' => $this->teamData($team),
			'members' => $team->membersWithOwner(),
		]);
	}

	public function update(UpdateTeamRequest $request, Team $team): RedirectResponse
	{
		$data = $request->validated();

		if (isset($data['name'])) {
			$data['slug'] = $this->uniqueSlug($data['name'], $team);
		}

		if ($request->hasFile('image')) {
			$imagePath = $request->file('image')->store("team-images/{$team->id}", 'public');

			if ($team->image_path) {
				Storage::disk('public')->delete($team->image_path);
			}

			$data['image_path'] = $imagePath;
		}

		$team->update($data);

		return to_route('teams.edit', $team);
	}

	public function addMember(AddTeamMemberRequest $request, Team $team): RedirectResponse
	{
		$user = User::query()->where('email', $request->validated('email'))->firstOrFail();
		$team->members()->syncWithoutDetaching([$user->id]);

		return back()->with('success', 'Team member added.');
	}

	public function removeMember(Team $team, User $member): RedirectResponse
	{
		abort_unless(request()->user()?->canManageTeam($team), 403);
		abort_if($member->is($team->owner), 422, 'The team owner cannot be removed.');
		abort_unless($team->members()->whereKey($member->id)->exists(), 404);

		$team->members()->detach($member);

		return back()->with('success', 'Team member removed.');
	}

	public function destroy(Team $team): RedirectResponse
	{
		abort_unless(request()->user()?->canDeleteTeam($team), 403);

		if ($team->image_path) {
			Storage::disk('public')->delete($team->image_path);
		}

		$team->delete();

		return to_route('teams.index')->with('success', 'Team deleted.');
	}

	/** @return array{id: int, name: string, slug: string, image_url: ?string} */
	private function teamData(Team $team): array
	{
		return [
			'id' => $team->id,
			'name' => $team->name,
			'slug' => $team->slug,
			'image_url' => $team->image_path
				? Storage::disk('public')->url($team->image_path)
				: null,
		];
	}

	private function uniqueSlug(string $name, ?Team $ignore = null): string
	{
		$baseSlug = Str::slug($name) ?: 'team';
		$slug = $baseSlug;
		$suffix = 2;

		while (Team::query()
			->where('slug', $slug)
			->when($ignore, fn($query) => $query->whereKeyNot($ignore->id))
			->exists()
		) {
			$slug = "{$baseSlug}-{$suffix}";
			$suffix++;
		}

		return $slug;
	}
}
