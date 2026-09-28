<?php

use App\Models\Hyperlink;
use App\Models\Team;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('dashboard'))->assertOk();
});

test('only users with a platform admin role can access admin routes', function () {
    $user = User::factory()->create();
    $teamAdmin = User::factory()->create();
    $admin = User::factory()->create();
    $teamAdminTeam = Team::query()->create([
        'owner_id' => $teamAdmin->id,
        'name' => 'Team Admin Team',
        'slug' => 'team-admin-team',
    ]);
    $team = Team::query()->create([
        'owner_id' => $admin->id,
        'name' => 'Admin Team',
        'slug' => 'admin-team',
    ]);
    $teamAdminRole = Role::query()->create([
        'name' => 'team-admin',
        'guard_name' => 'web',
        'team_id' => $teamAdminTeam->id,
    ]);
    $adminRole = Role::query()->create([
        'name' => 'admin',
        'guard_name' => 'web',
        'team_id' => $team->id,
    ]);

    app(PermissionRegistrar::class)->setPermissionsTeamId($teamAdminTeam->id);
    $teamAdmin->assignRole($teamAdminRole);
    app(PermissionRegistrar::class)->setPermissionsTeamId($team->id);
    $admin->assignRole($adminRole);
    app(PermissionRegistrar::class)->setPermissionsTeamId(null);

    $this->actingAs($user)
        ->get(route('admin.index'))
        ->assertForbidden();

    $this->actingAs($teamAdmin)
        ->get(route('admin.index'))
        ->assertForbidden();

    $this->actingAs($admin)
        ->get(route('admin.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('dashboard/admin/index'));

    $this->actingAs($admin)
        ->get(route('admin.users'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('dashboard/admin/users'));
});

test('guests are redirected from admin routes', function () {
    $this->get(route('admin.index'))->assertRedirect(route('login'));
});

test('role seeder gives Batman all access roles for every team', function () {
    User::factory()->create(['email' => 'admin@clickadelic.de']);
    $batman = User::factory()->create(['email' => 'batman@clickadelic.de']);
    $firstTeam = Team::query()->create([
        'owner_id' => $batman->id,
        'name' => 'First Team',
        'slug' => 'first-team',
    ]);
    $secondTeam = Team::query()->create([
        'owner_id' => $batman->id,
        'name' => 'Second Team',
        'slug' => 'second-team',
    ]);

    (new RoleSeeder)->run();

    $registrar = app(PermissionRegistrar::class);

    foreach ([$firstTeam, $secondTeam] as $team) {
        $registrar->setPermissionsTeamId($team->id);

        expect($batman->fresh()->getRoleNames()->all())
            ->toEqualCanonicalizing(['admin', 'team-admin', 'team-member']);
    }

    $registrar->setPermissionsTeamId(null);
});

test('authenticated users can access dashboard management pages', function (string $path, string $component) {
    $this->actingAs(User::factory()->create())
        ->get($path)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    ['/dashboard/categories', 'categories/index'],
    ['/dashboard/tags', 'tags/index'],
    ['/dashboard/posts', 'dashboard/posts/index'],
]);

test('the dashboard renders the authenticated user\'s hyperlinks', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $mine = Hyperlink::factory()->create(['created_by' => $user->id]);
    Hyperlink::factory()->create(['created_by' => $otherUser->id]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('dashboard/index')
                ->has('apps')
                ->has('hyperlinks.data', 1)
                ->where('hyperlinks.data.0.id', $mine->id)
        );
});
