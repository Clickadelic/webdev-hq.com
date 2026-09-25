<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
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

    /**
     * Display the dashboard post form.
     */
    public function index(): Response
    {
        return inertia('dashboard/posts/index');
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
}
