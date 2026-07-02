<?php

use App\Models\Hyperlink;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('dashboard'))->assertOk();
});

test('the dashboard renders the authenticated user\'s hyperlinks', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $mine = Hyperlink::factory()->create(['created_by' => $user->id]);
    Hyperlink::factory()->create(['created_by' => $otherUser->id]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('apps')
            ->has('hyperlinks.data', 1)
            ->where('hyperlinks.data.0.id', $mine->id)
        );
});
