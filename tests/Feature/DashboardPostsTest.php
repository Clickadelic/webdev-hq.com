<?php

use App\Enums\Status;
use App\Models\Post;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('authenticated users can list, create, and edit dashboard posts', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $post = Post::query()->create([
        'title' => 'My Post',
        'slug' => 'my-post',
        'content' => 'My post content.',
        'status' => Status::Draft,
        'created_by' => $user->id,
    ]);

    Post::query()->create([
        'title' => 'Another Post',
        'slug' => 'another-post',
        'content' => 'Another post content.',
        'status' => Status::Published,
        'created_by' => $otherUser->id,
    ]);

    $this->actingAs($user)
        ->get(route('posts.index'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('dashboard/posts/index')
                ->has('posts.data', 2)
                ->where('posts.data.0.id', $post->id)
        );

    $this->actingAs($user)
        ->get(route('posts.create'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('dashboard/posts/create')
                ->has('categories')
                ->has('tags')
        );

    $this->actingAs($user)
        ->get(route('posts.edit', $post))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('dashboard/posts/edit')
                ->where('post.id', $post->id)
                ->has('categories')
                ->has('tags')
        );
});
