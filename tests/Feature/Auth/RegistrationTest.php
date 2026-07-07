<?php

use App\Models\User;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Support\Facades\Notification;

test('registration screen can be rendered', function () {
    $this->withoutVite()->get(route('register'))->assertSuccessful();
});

test('new users can register', function () {
    Notification::fake();

    $this->post(route('register.store'), [
        'name'                  => 'Test User',
        'email'                 => 'test@example.com',
        'password'              => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect(route('dashboard', absolute: false));

    $this->assertAuthenticated();
});

test('verification email is sent after registration', function () {
    Notification::fake();

    $this->post(route('register.store'), [
        'name'                  => 'Test User',
        'email'                 => 'test@example.com',
        'password'              => 'password',
        'password_confirmation' => 'password',
    ]);

    $user = User::where('email', 'test@example.com')->firstOrFail();

    Notification::assertSentTo($user, VerifyEmailNotification::class);
});

test('newly registered user has unverified email', function () {
    Notification::fake();

    $this->post(route('register.store'), [
        'name'                  => 'Test User',
        'email'                 => 'test@example.com',
        'password'              => 'password',
        'password_confirmation' => 'password',
    ]);

    $user = User::where('email', 'test@example.com')->firstOrFail();

    expect($user->hasVerifiedEmail())->toBeFalse();
    expect($user->email_verified_at)->toBeNull();
});

test('unverified user is redirected to verification notice when accessing dashboard', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertRedirect(route('verification.notice'));
});

test('registration requires valid email', function () {
    Notification::fake();

    $this->post(route('register.store'), [
        'name'                  => 'Test User',
        'email'                 => 'not-an-email',
        'password'              => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect();

    $this->assertGuest();
    expect(User::where('email', 'not-an-email')->exists())->toBeFalse();
});

test('registration requires matching passwords', function () {
    Notification::fake();

    $this->post(route('register.store'), [
        'name'                  => 'Test User',
        'email'                 => 'test@example.com',
        'password'              => 'password',
        'password_confirmation' => 'different-password',
    ])->assertRedirect();

    $this->assertGuest();
    expect(User::where('email', 'test@example.com')->exists())->toBeFalse();
});

test('registration requires unique email', function () {
    Notification::fake();

    User::factory()->create(['email' => 'existing@example.com']);

    $this->post(route('register.store'), [
        'name'                  => 'Another User',
        'email'                 => 'existing@example.com',
        'password'              => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect();

    $this->assertGuest();
    expect(User::where('email', 'existing@example.com')->count())->toBe(1);
});
