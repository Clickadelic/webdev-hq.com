<?php

use App\Models\Tag;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

test('the tag ownership migration restores only missing columns and preserves existing data', function (array $missingColumns) {
    $creator = User::factory()->create();
    $team = Team::query()->create([
        'owner_id' => User::factory()->create()->id,
        'name' => 'Test Team',
        'slug' => 'test-team',
    ]);
    $tag = Tag::factory()->create([
        'name' => 'Existing tag',
        'slug' => 'existing-tag',
        'team_id' => $team->id,
        'created_by' => $creator->id,
    ]);

    foreach ($missingColumns as $column) {
        Schema::table('tags', function (Blueprint $table) use ($column) {
            $table->dropConstrainedForeignId($column);
        });
    }

    $migration = require database_path('migrations/2026_11_21_213924_ensure_tag_ownership_columns_exist.php');
    $migration->up();
    $migration->up();
    $migration->down();

    $tag->refresh();
    expect($tag->name)->toBe('Existing tag')
        ->and($tag->team_id)->toBe(in_array('team_id', $missingColumns) ? null : $team->id)
        ->and($tag->created_by)->toBe(in_array('created_by', $missingColumns) ? null : $creator->id);

    $tag->update(['team_id' => $team->id, 'created_by' => $creator->id]);
    $team->delete();
    $creator->delete();

    expect($tag->fresh()->team_id)->toBeNull()
        ->and($tag->fresh()->created_by)->toBeNull();
})->with([
    'both columns missing' => [['team_id', 'created_by']],
    'team missing' => [['team_id']],
    'creator missing' => [['created_by']],
    'both columns already present' => [[]],
]);
