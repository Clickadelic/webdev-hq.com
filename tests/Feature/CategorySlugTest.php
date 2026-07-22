<?php

use App\Models\Category;

test('home page can load categories with slugs', function () {
	Category::create([
		'id' => (string) str()->uuid(),
		'name' => 'News',
		'slug' => 'news',
	]);

	$response = $this->get('/');

	$response->assertStatus(200);
});
