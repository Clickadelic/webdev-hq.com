<?php

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('a user can upload a profile image', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $this->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => $user->name,
            'email' => $user->email,
            'profile_image' => UploadedFile::fake()->image('profile.png'),
        ])
        ->assertRedirect(route('profile.edit'));

    $profileImagePath = $user->refresh()->profile_image_path;

    expect($profileImagePath)->not->toBeNull();
    Storage::disk('public')->assertExists($profileImagePath);
});

test('only a team owner can upload a team image', function () {
    Storage::fake('public');
    $owner = User::factory()->create();
    $otherUser = User::factory()->create();
    $team = Team::query()->create([
        'owner_id' => $owner->id,
        'name' => 'Test Team',
        'slug' => 'test-team',
    ]);

    $this->actingAs($otherUser)
        ->patch(route('teams.update', $team), [
            'image' => UploadedFile::fake()->image('team.png'),
        ])
        ->assertForbidden();

    $this->actingAs($owner)
        ->patch(route('teams.update', $team), [
            'image' => UploadedFile::fake()->image('team.png'),
        ])
        ->assertRedirect(route('teams.edit', $team));

    $imagePath = $team->refresh()->image_path;

    expect($imagePath)->not->toBeNull();
    Storage::disk('public')->assertExists($imagePath);
});
