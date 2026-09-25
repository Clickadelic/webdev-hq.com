<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTeamRequest;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        $teams = Team::query()
            ->get()
            ->map(fn (Team $team): array => [
                ...$this->teamData($team),
                'can_edit' => request()->user()?->is($team->owner) ?? false,
            ]);

        return Inertia::render('teams/index', [
            'canRegister' => true,
            'teams' => $teams,
        ]);
    }

    public function edit(Team $team): Response
    {
        abort_unless(request()->user()?->is($team->owner), 403);

        return Inertia::render('teams/edit', [
            'team' => $this->teamData($team),
        ]);
    }

    public function update(UpdateTeamRequest $request, Team $team): RedirectResponse
    {
        $imagePath = $request->file('image')->store("team-images/{$team->id}", 'public');

        if ($team->image_path) {
            Storage::disk('public')->delete($team->image_path);
        }

        $team->update(['image_path' => $imagePath]);

        return to_route('teams.edit', $team);
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
}
