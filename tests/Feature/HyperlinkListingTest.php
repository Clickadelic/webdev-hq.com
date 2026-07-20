<?php

use App\Models\Hyperlink;
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

    $webResponse->assertInertia(fn (Assert $page) => $page
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
