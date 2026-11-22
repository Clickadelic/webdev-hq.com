<?php

use App\Enums\Status;
use App\Models\Post;
use App\Models\Tag;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
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
        ->get(route('posts.listPosts'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('dashboard/posts/index')
                ->has('posts.data', 2)
                ->where('posts.data.0.id', $post->id)
                ->missing('posts.data.0.author.email')
                ->missing('posts.data.1.author.email')
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

test('a post image upload is stored and displayed on public posts', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('posts.store'), [
        'title' => 'Uploaded Image',
        'slug' => 'uploaded-image',
        'content' => 'Post content.',
        'status' => Status::Published->value,
        'featured_image_upload' => UploadedFile::fake()->image('photo.jpg'),
    ])->assertSessionHasNoErrors()->assertRedirect();

    $post = Post::where('slug', 'uploaded-image')->firstOrFail();
    $media = $post->getFirstMedia('featured-image');
    expect($media)->not->toBeNull()->and($media->disk)->toBe('public');
    Storage::disk('public')->assertExists($media->getPathRelativeToRoot());

    $this->get(route('posts.index'))->assertInertia(fn (Assert $page) => $page
        ->where('posts.data.0.featured_image', $media->getUrl())
        ->missing('posts.data.0.media'));
});

test('post images can be replaced removed and kept on soft deletion', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $post = Post::factory()->create([
        'created_by' => $user->id,
        'title' => 'Image Post',
        'slug' => 'image-post',
        'content' => 'Post content.',
        'status' => Status::Draft,
        'featured_image' => 'https://example.com/legacy.jpg',
    ]);
    $payload = [
        'title' => $post->title,
        'slug' => $post->slug,
        'content' => $post->content,
        'status' => Status::Draft->value,
    ];

    $this->actingAs($user)->put(route('posts.update', $post), $payload)->assertSessionHasNoErrors();
    expect($post->fresh()->featured_image)->toBe('https://example.com/legacy.jpg');

    $this->post(route('posts.update', $post), [
        ...$payload,
        '_method' => 'PUT',
        'featured_image_upload' => UploadedFile::fake()->image('first.png'),
    ])->assertSessionHasNoErrors();
    $first = $post->fresh()->getFirstMedia('featured-image');
    Storage::disk('public')->assertExists($first->getPathRelativeToRoot());

    $this->post(route('posts.update', $post), [
        ...$payload,
        '_method' => 'PUT',
        'featured_image_upload' => UploadedFile::fake()->image('second.jpg'),
    ])->assertSessionHasNoErrors();
    $second = $post->fresh()->getFirstMedia('featured-image');
    expect($second->id)->not->toBe($first->id);
    Storage::disk('public')->assertMissing($first->getPathRelativeToRoot());
    Storage::disk('public')->assertExists($second->getPathRelativeToRoot());

    $this->delete(route('posts.destroy', $post))->assertRedirect();
    Storage::disk('public')->assertExists($second->getPathRelativeToRoot());
    $post->restore();

    $this->put(route('posts.update', $post), [
        ...$payload,
        'remove_featured_image' => true,
    ])->assertSessionHasNoErrors();
    expect($post->fresh()->featured_image)->toBeNull();
    Storage::disk('public')->assertMissing($second->getPathRelativeToRoot());
});

test('post image uploads reject invalid type extension and size', function (UploadedFile $file) {
    Storage::fake('public');
    $this->actingAs(User::factory()->create())->post(route('posts.store'), [
        'title' => 'Invalid Image',
        'slug' => 'invalid-image',
        'content' => 'Post content.',
        'status' => Status::Draft->value,
        'featured_image_upload' => $file,
    ])->assertSessionHasErrors('featured_image_upload');

    expect(Post::where('slug', 'invalid-image')->exists())->toBeFalse();
})->with([
    'not an image' => fn () => UploadedFile::fake()->create('file.txt', 10, 'text/plain'),
    'wrong extension' => fn () => UploadedFile::fake()->image('file.gif'),
    'larger than 5 MB' => fn () => UploadedFile::fake()->image('large.jpg')->size(5121),
]);

test('a post image up to 5 MB is accepted', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->create())->post(route('posts.store'), [
        'title' => 'Maximum Image',
        'slug' => 'maximum-image',
        'content' => 'Post content.',
        'status' => Status::Draft->value,
        'featured_image_upload' => UploadedFile::fake()->image('photo.png')->size(5120),
    ])->assertSessionHasNoErrors()->assertRedirect();
});

test('an invalid replacement leaves the existing image unchanged', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $post = Post::factory()->create([
        'created_by' => $user->id,
        'title' => 'Existing Image',
        'slug' => 'existing-image',
        'content' => 'Post content.',
        'status' => Status::Draft,
    ]);
    $media = $post->addMedia(UploadedFile::fake()->image('original.jpg'))->toMediaCollection('featured-image', 'public');

    $this->actingAs($user)->post(route('posts.update', $post), [
        '_method' => 'PUT',
        'title' => $post->title,
        'slug' => $post->slug,
        'content' => $post->content,
        'status' => Status::Draft->value,
        'featured_image_upload' => UploadedFile::fake()->create('file.txt', 10, 'text/plain'),
    ])->assertSessionHasErrors('featured_image_upload');

    expect($post->fresh()->getFirstMedia('featured-image')->id)->toBe($media->id);
    Storage::disk('public')->assertExists($media->getPathRelativeToRoot());
});

test('a post image cannot be removed and replaced in the same request', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $post = Post::factory()->create([
        'created_by' => $user->id,
        'title' => 'Existing Image',
        'slug' => 'existing-image',
        'content' => 'Post content.',
        'status' => Status::Draft,
        'featured_image' => 'https://example.com/legacy.jpg',
    ]);

    $this->actingAs($user)->post(route('posts.update', $post), [
        '_method' => 'PUT',
        'title' => $post->title,
        'slug' => $post->slug,
        'content' => $post->content,
        'status' => Status::Draft->value,
        'remove_featured_image' => true,
        'featured_image_upload' => UploadedFile::fake()->image('photo.jpg'),
    ])->assertSessionHasErrors('featured_image_upload');

    expect($post->fresh()->featured_image)->toBe('https://example.com/legacy.jpg');
});

test('guests cannot upload post images', function () {
    Storage::fake('public');

    $this->post(route('posts.store'), [
        'featured_image_upload' => UploadedFile::fake()->image('photo.jpg'),
    ])->assertRedirect(route('login'));

    expect(Storage::disk('public')->allFiles())->toBeEmpty();
});

test('removing a legacy post image clears its URL', function () {
    $user = User::factory()->create();
    $post = Post::factory()->create([
        'created_by' => $user->id,
        'title' => 'Legacy Image',
        'slug' => 'legacy-image',
        'content' => 'Post content.',
        'status' => Status::Draft,
        'featured_image' => 'https://example.com/legacy.jpg',
    ]);

    $this->actingAs($user)->put(route('posts.update', $post), [
        'title' => $post->title,
        'slug' => $post->slug,
        'content' => $post->content,
        'status' => Status::Draft->value,
        'remove_featured_image' => true,
    ])->assertSessionHasNoErrors();

    expect($post->fresh()->featured_image)->toBeNull();
});

test('only the owner and assigned team members can edit or delete posts', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $outsider = User::factory()->create();
    $team = Team::create(['name' => 'Editors', 'slug' => 'editors', 'owner_id' => $owner->id]);
    $team->members()->attach([$owner->id, $member->id]);
    $post = Post::factory()->create(['created_by' => $owner->id, 'team_id' => $team->id, 'title' => 'Team post', 'slug' => 'team-post', 'content' => 'Content', 'status' => Status::Draft]);
    $personal = Post::factory()->create(['created_by' => $owner->id, 'team_id' => null, 'title' => 'Personal post', 'slug' => 'personal-post', 'content' => 'Content', 'status' => Status::Draft]);
    $payload = ['title' => 'Changed', 'slug' => $post->slug, 'content' => 'Updated', 'status' => 'draft'];

    $this->actingAs($outsider)->get(route('posts.edit', $post))->assertForbidden();
    $this->put(route('posts.update', $post), $payload)->assertForbidden();
    $this->delete(route('posts.destroy', $post))->assertForbidden();
    $this->delete(route('posts.destroy', $personal))->assertForbidden();
    expect($post->fresh()->title)->not->toBe('Changed');

    $this->actingAs($member)->get(route('posts.edit', $post))
        ->assertOk()->assertInertia(fn (Assert $page) => $page->where('canAssignTeam', false));
    $this->put(route('posts.update', $post), $payload)->assertSessionHasNoErrors();
    $this->get(route('posts.edit', $personal))->assertForbidden();
    $this->put(route('posts.update', $personal), $payload)->assertForbidden();
    $this->delete(route('posts.destroy', $personal))->assertForbidden();
    $this->delete(route('posts.destroy', $post))->assertRedirect();
    $this->assertSoftDeleted($post);

    $this->actingAs($owner)->get(route('posts.edit', $personal))
        ->assertOk()->assertInertia(fn (Assert $page) => $page->where('canAssignTeam', true));
    $this->delete(route('posts.destroy', $personal))->assertRedirect();
    $this->assertSoftDeleted($personal);
});

test('post owners retain access after leaving the assigned team and former members lose access', function () {
    $owner = User::factory()->create();
    $formerMember = User::factory()->create();
    $team = Team::create(['name' => 'Editors', 'slug' => 'editors', 'owner_id' => $owner->id]);
    $team->members()->attach($formerMember);
    $post = Post::factory()->create(['created_by' => $owner->id, 'team_id' => $team->id, 'title' => 'Team post', 'slug' => 'team-post', 'content' => 'Content', 'status' => Status::Draft]);

    $this->actingAs($formerMember)->get(route('posts.edit', $post))->assertOk();
    $team->members()->detach($formerMember);
    $this->actingAs($formerMember->fresh())->get(route('posts.edit', $post))->assertForbidden();
    $this->actingAs($owner)->get(route('posts.edit', $post))->assertOk();
    $this->put(route('posts.update', $post), [
        'title' => 'Still mine',
        'slug' => $post->slug,
        'content' => 'Updated',
        'status' => 'draft',
        'team_id' => $team->id,
    ])->assertSessionHasNoErrors();
    $this->delete(route('posts.destroy', $post))->assertRedirect();
});

test('post team assignment is optional and restricted to the owner and their teams', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $other = User::factory()->create();
    $team = Team::create(['name' => 'Editors', 'slug' => 'editors', 'owner_id' => $owner->id]);
    $otherTeam = Team::create(['name' => 'Other', 'slug' => 'other', 'owner_id' => $other->id]);
    $team->members()->attach([$owner->id, $member->id]);
    $payload = ['title' => 'New post', 'slug' => 'new-post', 'content' => 'Content', 'status' => 'draft'];

    $this->actingAs($owner)->post(route('posts.store'), [...$payload, 'team_id' => $otherTeam->id])
        ->assertSessionHasErrors('team_id');
    $this->post(route('posts.store'), [...$payload, 'team_id' => $team->id])->assertSessionHasNoErrors();
    $post = Post::where('slug', 'new-post')->firstOrFail();
    expect($post->team_id)->toBe($team->id);

    $update = [...$payload, 'team_id' => null];
    $this->actingAs($member)->put(route('posts.update', $post), [...$payload, 'team_id' => $team->id])
        ->assertSessionHasNoErrors();
    $this->actingAs($member)->put(route('posts.update', $post), $update)->assertForbidden();
    expect($post->fresh()->team_id)->toBe($team->id);
    $this->actingAs($owner)->put(route('posts.update', $post), [...$payload, 'team_id' => $otherTeam->id])
        ->assertSessionHasErrors('team_id');
    $this->put(route('posts.update', $post), $update)->assertSessionHasNoErrors();
    expect($post->fresh()->team_id)->toBeNull();
    $this->actingAs($member)->get(route('posts.edit', $post))->assertForbidden();

    $this->actingAs($owner)->post(route('posts.store'), [...$payload, 'slug' => 'personal-post'])->assertSessionHasNoErrors();
    $personal = Post::where('slug', 'personal-post')->firstOrFail();
    expect($personal->team_id)->toBeNull();
    $this->put(route('posts.update', $personal), [...$payload, 'slug' => 'personal-post', 'team_id' => $team->id])
        ->assertSessionHasNoErrors();
    expect($personal->fresh()->team_id)->toBe($team->id);
    $this->actingAs($member)->get(route('posts.edit', $personal))->assertOk();
});

test('dashboard post action permissions reflect ownership and team membership', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $outsider = User::factory()->create();
    $team = Team::create(['name' => 'Editors', 'slug' => 'editors', 'owner_id' => $owner->id]);
    $team->members()->attach([$owner->id, $member->id]);
    $post = Post::factory()->create(['created_by' => $owner->id, 'team_id' => $team->id, 'title' => 'Team post', 'slug' => 'team-post', 'content' => 'Content', 'status' => Status::Draft]);

    foreach ([[$owner, true], [$member, true], [$outsider, false]] as [$user, $allowed]) {
        $this->actingAs($user)->get(route('posts.listPosts'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('posts.data.0.id', $post->id)
                ->where('posts.data.0.can_manage', $allowed));
    }
});
