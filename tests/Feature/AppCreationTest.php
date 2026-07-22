<?php

use App\Models\User;

test('authenticated user can create an app', function () {
	$user = User::factory()->create();

	$response = $this->actingAs($user)->post('/apps', [
		'title' => 'Example App',
		'url' => 'https://example.com',
		'target' => '_blank',
	]);

	$response->assertRedirect();
});
