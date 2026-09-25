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
        $user = User::query()->where('email', 'batman@clickadelic.de')->firstOrFail();
        $team = Team::query()->where('slug', 'marketing')->firstOrFail();

        Tag::updateOrCreate(
            ['slug' => 'php'],
            [
                'name' => 'PHP',
                'created_by' => $user->id,
                'team_id' => $team->id,
            ],
        );
        Tag::updateOrCreate(
            ['slug' => 'javascript'],
            [
                'name' => 'JavaScript',
                'created_by' => $user->id,
                'team_id' => $team->id,
            ],
        );
    }
}
