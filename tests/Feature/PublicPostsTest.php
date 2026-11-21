<?php

use App\Enums\Status;
use App\Http\Middleware\HandleInertiaRequests;
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

    $this->get(route('posts.index'))
        ->assertOk()
        ->assertDontSee($author->email)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('posts/index')
                ->has('posts.data', 1)
                ->where('posts.data.0.id', $publishedPost->id)
                ->where('posts.data.0.title', 'Published Post')
                ->where('posts.data.0.author.name', $author->name)
                ->missing('posts.data.0.author.email')
        );
});

test('public post responses do not disclose the author email', function (bool $inertia, bool $authenticated) {
    $author = User::factory()->create();
    $viewer = User::factory()->create();
    $post = Post::factory()->create([
        'title' => 'Public Post',
        'slug' => 'public-post',
        'content' => 'Public post content.',
        'created_by' => $author->id,
        'status' => Status::Published,
        'published_at' => now()->subMinute(),
    ]);

    if ($authenticated) {
        $this->actingAs($viewer);
    }

    $headers = $inertia ? [
        'X-Inertia' => 'true',
        'X-Inertia-Version' => app(HandleInertiaRequests::class)->version(request()),
    ] : [];

    foreach ([
        ['route' => route('posts.index'), 'author' => 'posts.data.0.author'],
        ['route' => route('posts.show', $post->slug), 'author' => 'post.author'],
    ] as $page) {
        $response = $this->get($page['route'], $headers)
            ->assertOk()
            ->assertDontSee($author->email);

        if ($inertia) {
            $response->assertJsonPath('props.'.$page['author'].'.name', $author->name)
                ->assertJsonMissingPath('props.'.$page['author'].'.email');

            if ($authenticated) {
                $response->assertJsonPath('props.auth.user.email', $viewer->email);
            }
        } else {
            $response->assertInertia(fn (Assert $inertiaPage) => $inertiaPage
                ->where($page['author'].'.name', $author->name)
                ->missing($page['author'].'.email'));

            if ($authenticated) {
                $response->assertInertia(fn (Assert $inertiaPage) => $inertiaPage
                    ->where('auth.user.email', $viewer->email));
            }
        }
    }
})->with([
    'guest HTML' => [false, false],
    'guest Inertia' => [true, false],
    'authenticated HTML' => [false, true],
    'authenticated Inertia' => [true, true],
]);
