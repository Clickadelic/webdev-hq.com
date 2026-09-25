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
            ['url' => 'https://laravel.com'],
            [
                'title' => 'Laravel',
                'favicon_url' => 'https://laravel.com/favicon.ico',
                'target' => '_blank',
                'position' => 1,
                'created_by' => $user->id,
                'team_id' => $team->id,
            ],
        );
    }
}
