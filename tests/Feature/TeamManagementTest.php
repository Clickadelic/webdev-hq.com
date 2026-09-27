<?php

use App\Models\Hyperlink;
use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot access the private team list', function () {
	$this->get(route('teams.index'))
		->assertRedirect(route('login'));
});

test('users see only teams they own or belong to', function () {
	$member = User::factory()->create();
	$owner = User::factory()->create();
	$outsider = User::factory()->create();

	$memberTeam = Team::query()->create([
		'owner_id' => $owner->id,
		'name' => 'Member Team',
		'slug' => 'member-team',
	]);
	$memberTeam->members()->attach($member);

	Team::query()->create([
		'owner_id' => $outsider->id,
		'name' => 'Private Team',
		'slug' => 'private-team',
	]);

	$this->actingAs($member)
		->get(route('teams.index'))
		->assertInertia(fn(Assert $page) => $page
			->component('teams/index')
			->has('teams', 1)
			->where('teams.0.name', 'Member Team')
			->where('teams.0.can_manage', false));
});

test('a user can create a team and becomes its owner and member', function () {
	$owner = User::factory()->create();

	$this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\PreventRequestForgery::class)
		->actingAs($owner)
		->post(route('teams.store'), ['name' => 'Design Team'])
		->assertRedirect();

	$team = Team::query()->where('name', 'Design Team')->firstOrFail();

	expect($team->owner_id)->toBe($owner->id)
		->and($team->slug)->toBe('design-team')
		->and($team->members()->whereKey($owner->id)->exists())->toBeTrue();
});

test('only the owner can add and remove members', function () {
	$owner = User::factory()->create();
	$member = User::factory()->create();
	$outsider = User::factory()->create();
	$team = Team::query()->create([
		'owner_id' => $owner->id,
		'name' => 'Design Team',
		'slug' => 'design-team',
	]);
	$team->members()->attach($owner);

	$this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\PreventRequestForgery::class)
		->actingAs($outsider)
		->post(route('teams.members.store', $team), ['email' => $member->email])
		->assertForbidden();

	$this->actingAs($owner)
		->post(route('teams.members.store', $team), ['email' => $member->email])
		->assertRedirect();

	expect($team->members()->whereKey($member->id)->exists())->toBeTrue();

	$this->actingAs($owner)
		->delete(route('teams.members.destroy', [$team, $member]))
		->assertRedirect();

	expect($team->members()->whereKey($member->id)->exists())->toBeFalse();

	$this->actingAs($owner)
		->delete(route('teams.members.destroy', [$team, $owner]))
		->assertUnprocessable();
});

test('only the owner can edit or delete a team', function () {
	$owner = User::factory()->create();
	$otherUser = User::factory()->create();
	$team = Team::query()->create([
		'owner_id' => $owner->id,
		'name' => 'Design Team',
		'slug' => 'design-team',
	]);

	$this->actingAs($otherUser)
		->get(route('teams.edit', $team))
		->assertForbidden();

	$this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\PreventRequestForgery::class)
		->actingAs($otherUser)
		->patch(route('teams.update', $team), ['name' => 'Unauthorized Rename'])
		->assertForbidden();

	$this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\PreventRequestForgery::class)
		->actingAs($otherUser)
		->delete(route('teams.destroy', $team))
		->assertForbidden();
});

test('the owner can rename a team and its slug follows the new name', function () {
	$owner = User::factory()->create();
	$team = Team::query()->create([
		'owner_id' => $owner->id,
		'name' => 'Design Team',
		'slug' => 'design-team',
	]);

	$this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\PreventRequestForgery::class)
		->actingAs($owner)
		->patch(route('teams.update', $team), ['name' => 'Product Design'])
		->assertRedirect(route('teams.edit', $team));

	expect($team->refresh()->name)->toBe('Product Design')
		->and($team->slug)->toBe('product-design');
});

test('deleting a team preserves its hyperlinks as personal content', function () {
	$owner = User::factory()->create();
	$team = Team::query()->create([
		'owner_id' => $owner->id,
		'name' => 'Design Team',
		'slug' => 'design-team',
	]);
	$hyperlink = Hyperlink::factory()->for($owner, 'author')->create([
		'team_id' => $team->id,
	]);

	$this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\PreventRequestForgery::class)
		->actingAs($owner)
		->delete(route('teams.destroy', $team))
		->assertRedirect(route('teams.index'));

	$this->assertDatabaseMissing('teams', ['id' => $team->id]);

	expect($hyperlink->refresh()->team_id)->toBeNull();
});
