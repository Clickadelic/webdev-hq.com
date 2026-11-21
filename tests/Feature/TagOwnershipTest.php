<?php

use App\Models\Hyperlink;
use App\Models\Tag;
use App\Models\Team;
use App\Models\User;

function tagTestTeam(User $user, string $slug = 'test-team'): Team
{
    $team = Team::query()->create(['owner_id' => $user->id, 'name' => $slug, 'slug' => $slug]);
    $user->teams()->attach($team);

    return $team;
}

test('direct tag creation records the authenticated creator and selected team', function (bool $api) {
    $user = User::factory()->create();
    tagTestTeam($user, 'first-team');
    $team = tagTestTeam($user);
    $payload = ['name' => 'New Tag', 'team_id' => $team->id, 'created_by' => User::factory()->create()->id];

    if ($api) {
        $this->actingAs($user, 'sanctum')->postJson('/api/v1/tags', $payload)->assertSuccessful();
    } else {
        $this->actingAs($user)->post(route('tags.store'), $payload)->assertRedirect();
    }

    $tag = Tag::query()->where('name', 'New Tag')->firstOrFail();
    expect($tag->created_by)->toBe($user->id)
        ->and($tag->team_id)->toBe($team->id)
        ->and($tag->creator->is($user))->toBeTrue()
        ->and($tag->team->is($team))->toBeTrue();
})->with(['web' => [false], 'api' => [true]]);

test('tag creation rejects a missing team or another users team', function () {
    $user = User::factory()->create();
    $otherTeam = tagTestTeam(User::factory()->create());

    $this->actingAs($user, 'sanctum')
        ->postJson('/api/v1/tags', ['name' => 'No Team'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('team_id');
    $this->postJson('/api/v1/tags', ['name' => 'Wrong Team', 'team_id' => $otherTeam->id])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('team_id');
    expect(Tag::query()->count())->toBe(0);
});

test('new tags created with a hyperlink use its selected team and creator', function (bool $api) {
    $user = User::factory()->create();
    $team = tagTestTeam($user);
    $payload = [
        'title' => 'New Link',
        'url' => 'https://example.com/new-link',
        'status' => 'published',
        'tags' => ['New Tag'],
        'team_id' => $team->id,
    ];

    if ($api) {
        $this->actingAs($user, 'sanctum')->postJson('/api/v1/hyperlinks', $payload)->assertCreated();
    } else {
        $this->actingAs($user)->post(route('hyperlinks.store'), $payload)->assertRedirect();
    }

    $tag = Tag::query()->where('name', 'New Tag')->firstOrFail();
    $hyperlink = Hyperlink::query()->where('title', 'New Link')->firstOrFail();
    expect($tag->created_by)->toBe($user->id)
        ->and($tag->team_id)->toBe($team->id)
        ->and($hyperlink->team_id)->toBe($team->id)
        ->and($hyperlink->tags()->whereKey($tag->id)->exists())->toBeTrue();
})->with(['web' => [false], 'api' => [true]]);

test('a hyperlink cannot create a new tag without a selected team', function () {
    $user = User::factory()->create();
    tagTestTeam($user);

    $this->actingAs($user, 'sanctum')->postJson('/api/v1/hyperlinks', [
        'title' => 'New Link',
        'url' => 'https://example.com/new-link',
        'status' => 'published',
        'tags' => ['New Tag'],
    ])->assertUnprocessable()->assertJsonValidationErrors('team_id');

    expect(Hyperlink::query()->count())->toBe(0)
        ->and(Tag::query()->count())->toBe(0);
});

test('a hyperlink cannot create a tag for another users team', function () {
    $user = User::factory()->create();
    $otherTeam = tagTestTeam(User::factory()->create());

    $this->actingAs($user, 'sanctum')->postJson('/api/v1/hyperlinks', [
        'title' => 'New Link',
        'url' => 'https://example.com/new-link',
        'status' => 'published',
        'team_id' => $otherTeam->id,
        'tags' => ['New Tag'],
    ])->assertUnprocessable()->assertJsonValidationErrors('team_id');

    expect(Hyperlink::query()->count())->toBe(0)
        ->and(Tag::query()->count())->toBe(0);
});

test('a hyperlink can reuse an existing tag without selecting a team', function () {
    $creator = User::factory()->create();
    $team = tagTestTeam($creator);
    $existingTag = Tag::factory()->create([
        'name' => 'Existing',
        'slug' => 'existing',
        'team_id' => $team->id,
        'created_by' => $creator->id,
    ]);

    $this->actingAs(User::factory()->create(), 'sanctum')->postJson('/api/v1/hyperlinks', [
        'title' => 'New Link',
        'url' => 'https://example.com/new-link',
        'status' => 'published',
        'tags' => ['Existing'],
    ])->assertCreated();

    expect(Hyperlink::query()->where('title', 'New Link')->firstOrFail()->tags()->whereKey($existingTag->id)->exists())->toBeTrue()
        ->and($existingTag->fresh()->created_by)->toBe($creator->id)
        ->and($existingTag->fresh()->team_id)->toBe($team->id);
});

test('editing a hyperlink uses its team without changing an existing tag owner', function () {
    $user = User::factory()->create();
    $team = tagTestTeam($user);
    $other = User::factory()->create();
    $otherTeam = tagTestTeam($other, 'other-team');
    $existingTag = Tag::factory()->create([
        'name' => 'Existing',
        'slug' => 'existing',
        'team_id' => $otherTeam->id,
        'created_by' => $other->id,
    ]);
    $hyperlink = Hyperlink::factory()->create(['created_by' => $user->id, 'team_id' => $team->id]);

    $this->actingAs($user)->put(route('hyperlinks.update', $hyperlink), [
        'title' => 'Updated Link',
        'url' => 'https://example.com/updated-link',
        'status' => 'published',
        'tags' => ['Existing', 'New Tag'],
    ])->assertRedirect();

    $newTag = Tag::query()->where('name', 'New Tag')->firstOrFail();
    expect($newTag->created_by)->toBe($user->id)
        ->and($newTag->team_id)->toBe($team->id)
        ->and($existingTag->fresh()->created_by)->toBe($other->id)
        ->and($existingTag->fresh()->team_id)->toBe($otherTeam->id);
});

test('a team can be selected when creating a tag on a personal hyperlink', function () {
    $user = User::factory()->create();
    $team = tagTestTeam($user);
    $hyperlink = Hyperlink::factory()->create(['created_by' => $user->id, 'team_id' => null]);

    $this->actingAs($user)->put(route('hyperlinks.update', $hyperlink), [
        'title' => 'Updated Link',
        'url' => 'https://example.com/updated-link',
        'status' => 'published',
        'team_id' => $team->id,
        'tags' => ['New Tag'],
    ])->assertRedirect();

    expect($hyperlink->fresh()->team_id)->toBe($team->id)
        ->and(Tag::query()->where('name', 'New Tag')->value('team_id'))->toBe($team->id);
});
