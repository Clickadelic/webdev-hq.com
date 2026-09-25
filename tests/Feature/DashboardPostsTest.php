<?php

use App\Enums\Status;
use App\Models\Post;
use App\Models\Tag;
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
        'status' => Status::Published->value,
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

test('authenticated users can update a post with its selected tags', function () {
    $user = User::factory()->create();
    $post = Post::query()->create([
        'title' => 'Original Post',
        'slug' => 'original-post',
        'content' => 'Original post content.',
        'status' => Status::Draft,
        'created_by' => $user->id,
    ]);
    $tag = Tag::query()->create([
        'name' => 'Laravel',
        'slug' => 'laravel',
    ]);

    $this->actingAs($user)
        ->put(route('posts.update', $post), [
            'title' => 'Updated Post',
            'slug' => 'updated-post',
            'content' => 'Updated post content.',
            'status' => Status::Published->value,
            'tag_ids' => [$tag->id],
        ])
        ->assertRedirect();

    $post->refresh();

    expect($post->title)->toBe('Updated Post')
        ->and($post->status)->toBe(Status::Published)
        ->and($post->tags->modelKeys())->toBe([$tag->id]);
});
