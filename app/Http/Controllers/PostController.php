<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
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
		$post->delete();

		return back()->with('success', 'Post successfully deleted.');
	}
}
