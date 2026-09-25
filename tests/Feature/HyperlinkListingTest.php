<?php

use App\Models\Hyperlink;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('web and api hyperlink indexes return the same model results', function () {
    $user = User::factory()->create();

    $older = Hyperlink::factory()->create(['created_at' => now()->subDay()]);
    $newer = Hyperlink::factory()->create(['created_at' => now()]);

    $expectedIds = [$newer->id, $older->id];

    $webResponse = $this
        ->actingAs($user)
        ->get(route('hyperlinks.index'));

    $apiResponse = $this
        ->actingAs($user, 'sanctum')
        ->getJson('/api/v1/hyperlinks');

    $webResponse->assertInertia(
        fn (Assert $page) => $page
            ->component('hyperlinks/index')
            ->where('hyperlinks.data.0.id', $expectedIds[0])
            ->where('hyperlinks.data.1.id', $expectedIds[1])
    );

    expect($apiResponse->json('hyperlinks.data.*.id'))->toBe($expectedIds);
});

test('authenticated users can create hyperlinks via the api', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user, 'sanctum')
        ->postJson('/api/v1/hyperlinks', [
            'title' => 'Test Hyperlink',
            'url' => 'https://example.com/test-hyperlink',
            'description' => 'A hyperlink created through the API.',
            'category' => 'Testing',
            'status' => 'published',
            'tags' => ['api', 'postman'],
        ]);

    $response
        ->assertCreated()
        ->assertJsonPath('hyperlink.title', 'Test Hyperlink');

    $hyperlink = Hyperlink::query()
        ->where('title', 'Test Hyperlink')
        ->firstOrFail();

    expect($hyperlink->created_by)->toBe($user->id)
        ->and($hyperlink->tags()->pluck('name')->all())->toEqualCanonicalizing(['api', 'postman']);
});

test('dashboard hyperlinks are assigned to the authenticated user team', function () {
    $user = User::factory()->create();
    $team = Team::query()->create([
        'owner_id' => $user->id,
        'name' => 'Test Team',
        'slug' => 'test-team',
    ]);
    $user->teams()->attach($team);

    $this
        ->actingAs($user)
        ->post(route('hyperlinks.store'), [
            'title' => 'Team Hyperlink',
            'url' => 'https://example.com/team-hyperlink',
            'description' => 'A team hyperlink.',
            'status' => 'published',
            'tags' => [],
        ])
        ->assertRedirect();

    expect(Hyperlink::query()->where('title', 'Team Hyperlink')->value('team_id'))
        ->toBe($team->id);
});

test('authenticated users can update their hyperlinks from the dashboard', function () {
    $user = User::factory()->create();
    $hyperlink = Hyperlink::factory()->for($user, 'author')->create();

    $response = $this
        ->actingAs($user)
        ->put(route('hyperlinks.update', $hyperlink), [
            'title' => 'Updated Hyperlink',
            'url' => 'https://example.com/updated-hyperlink',
            'favicon_url' => 'https://example.com/favicon.ico',
            'description' => 'An updated hyperlink.',
            'category' => '',
            'status' => 'published',
            'tags' => [],
        ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('hyperlinks', [
        'id' => $hyperlink->id,
        'title' => 'Updated Hyperlink',
    ]);
});
