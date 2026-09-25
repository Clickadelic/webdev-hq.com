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
                    'batman@clickadelic.de',
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
            $owner = User::query()->where('email', $teamData['owner'])->firstOrFail();
            $team = Team::updateOrCreate(
                ['slug' => $teamData['slug']],
                [
                    'name' => $teamData['name'],
                    'owner_id' => $owner->id,
                ],
            );

            $memberIds = collect($teamData['members'])
                ->map(fn (string $email): string => User::query()->where('email', $email)->firstOrFail()->id)
                ->all();
            $team->members()->sync($memberIds);
        }
    }
}
