<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display published posts publicly.
     */
    public function showPosts(): Response
    {
        return inertia('posts/index', [
            'posts' => Post::appListing(),
            'canRegister' => true,
        ]);
    }

    /** Display all posts in the dashboard. */
    public function index(): Response
    {
        return inertia('dashboard/posts/index', [
            'posts' => Post::query()
                ->with(['author', 'category', 'tags'])
                ->latest()
                ->paginate(15),
        ]);
    }

    /** Display the dashboard post creation form. */
    public function create(): Response
    {
        return inertia('dashboard/posts/create', $this->formOptions());
    }

    /** Display the dashboard post editing form. */
    public function edit(Post $post): Response
    {
        return inertia('dashboard/posts/edit', [
            'post' => $post->load(['category', 'tags']),
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
        unset($validated['tag_ids']);

        $post = Post::create([
            ...$validated,
            'created_by' => Auth::id(),
        ]);

        $post->tags()->sync($tagIds);

        return redirect()->route('dashboard.posts.create')
            ->with('success', 'Post successfully created.');
    }

    /**
     * Update the specified post.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $validated = $request->validated();
        $tagIds = $validated['tag_ids'] ?? [];
        unset($validated['tag_ids']);

        $post->update($validated);
        $post->tags()->sync($tagIds);

        return back()->with('success', 'Post successfully updated.');
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Post $post): RedirectResponse
    {
        abort_if((int) $post->created_by !== (int) Auth::id(), 403);
        $post->delete($post->id);

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
}
