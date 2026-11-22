<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Response;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Throwable;

class PostController extends Controller
{
    /** Display all posts in the public frontend. */
    public function index(): Response
    {
        return inertia('posts/index', [
            'posts' => Post::query()
                ->published()
                ->with(['author:id,name', 'category', 'tags', 'media'])
                ->latest('published_at')
                ->paginate(15),
        ]);
    }

    /** Display the dashboard post creation form. */
    public function create(): Response
    {
        return inertia('dashboard/posts/create', $this->formOptions());
    }

    /** Display the specified post publicly. */
    public function show(Post $post): Response
    {
        return inertia('posts/show', [
            'post' => $post->load(['author:id,name', 'category', 'tags', 'media']),
            'canRegister' => true,
        ]);
    }

    /** Display the dashboard post editing form. */
    public function edit(Post $post): Response
    {
        Gate::authorize('update', $post);

        return inertia('dashboard/posts/edit', [
            'post' => $post->load(['category', 'tags', 'media', 'team:id,name']),
            'canAssignTeam' => Gate::allows('assignTeam', $post),
            ...$this->formOptions(),
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $tagIds = $validated['tag_ids'] ?? [];
        unset($validated['tag_ids'], $validated['featured_image_upload']);
        $uploadedMedia = null;

        try {
            DB::transaction(function () use ($request, $validated, $tagIds, &$uploadedMedia): void {
                $post = Post::create([
                    ...$validated,
                    'created_by' => Auth::id(),
                ]);
                $post->tags()->sync($tagIds);
                if ($request->hasFile('featured_image_upload')) {
                    $uploadedMedia = $this->storeFeaturedImage($post, $request->file('featured_image_upload'));
                }
            });
        } catch (Throwable $exception) {
            $uploadedMedia?->delete();
            throw $exception;
        }

        return redirect()->route('posts.create')
            ->with('success', 'Post successfully created.');
    }

    /**
     * Update the specified post.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $validated = $request->validated();
        $tagIds = $validated['tag_ids'] ?? [];
        unset($validated['tag_ids'], $validated['featured_image_upload'], $validated['remove_featured_image']);
        $replaceImage = $request->hasFile('featured_image_upload');
        $removeImage = $request->boolean('remove_featured_image');
        $previousMedia = ($replaceImage || $removeImage) ? $post->getFirstMedia('featured-image') : null;
        $uploadedMedia = null;

        if ($replaceImage || $removeImage) {
            $validated['featured_image'] = null;
        }

        try {
            DB::transaction(function () use ($request, $post, $validated, $tagIds, $replaceImage, &$uploadedMedia): void {
                $post->update($validated);
                $post->tags()->sync($tagIds);
                if ($replaceImage) {
                    $uploadedMedia = $this->storeFeaturedImage($post, $request->file('featured_image_upload'));
                }
            });
        } catch (Throwable $exception) {
            $uploadedMedia?->delete();
            throw $exception;
        }

        $previousMedia?->delete();

        return back()->with('success', 'Post successfully updated.');
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Post $post): RedirectResponse
    {
        Gate::authorize('delete', $post);
        $post->delete();

        return back()->with('success', 'Post successfully deleted.');
    }

    /** @return array{categories: Collection<int, Category>, tags: Collection<int, Tag>} */
    private function formOptions(): array
    {
        return [
            'categories' => Category::query()->orderBy('name', 'asc')->get(),
            'tags' => Tag::query()->orderBy('name', 'asc')->get(),
        ];
    }

    public function listPosts(Request $request): Response
    {
        $user = $request->user()->loadMissing('teams');
        $posts = Post::query()
            ->with(['author:id,name', 'category', 'tags', 'media'])
            ->latest()
            ->paginate(15);

        $posts->getCollection()->each(function (Post $post) use ($user): void {
            $post->setAttribute('can_manage', $user->can('update', $post));
        });

        return inertia('dashboard/posts/index', [
            'posts' => $posts,
        ]);
    }

    private function storeFeaturedImage(Post $post, UploadedFile $file): Media
    {
        return $post->addMedia($file)
            ->usingFileName(Str::uuid().'.'.$file->extension())
            ->toMediaCollection('featured-image', 'public');
    }
}
