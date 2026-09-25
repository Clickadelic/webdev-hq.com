<?php

use App\Enums\Status;
use App\Models\Post;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('public posts page lists only published posts', function () {
    $author = User::factory()->create();

    $publishedPost = Post::query()->create([
        'title' => 'Published Post',
        'slug' => 'published-post',
        'content' => 'Published post content.',
        'status' => Status::Published,
        'published_at' => now()->subMinute(),
        'created_by' => $author->id,
    ]);

    Post::query()->create([
        'title' => 'Draft Post',
        'slug' => 'draft-post',
        'content' => 'Draft post content.',
        'status' => Status::Draft,
        'created_by' => $author->id,
    ]);

    $this->get(route('public.posts.index'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('posts/index')
                ->has('posts.data', 1)
                ->where('posts.data.0.id', $publishedPost->id)
                ->where('posts.data.0.title', 'Published Post')
        );
});
