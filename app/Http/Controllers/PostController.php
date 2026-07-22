<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
	public function index(): Response
	{
		return Inertia::render('Posts/Index', [
			'posts' => Post::appListing(),
		]);
	}

	public function create(): Response
	{
		return Inertia::render('Posts/Create', [
			'categories' => Category::all(['id', 'name']),
			'tags' => Tag::all(['id', 'name']),
		]);
	}

	public function store(StorePostRequest $request): RedirectResponse
	{
		$validated = $request->validated();

		/** @var Post $post */
		$post = Auth::user()->posts()->create($validated);

		// Tags verknüpfen (falls vorhanden)
		if (!empty($validated['tag_ids'])) {
			$post->tags()->sync($validated['tag_ids']);
		}

		return redirect()->back()->with('success', 'Post erfolgreich erstellt.');
	}

	public function edit(Post $post): Response
	{
		return Inertia::render('Posts/Edit', [
			'post' => $post->load(['category', 'tags']),
			'categories' => Category::all(['id', 'name']),
			'tags' => Tag::all(['id', 'name']),
		]);
	}

	public function update(UpdatePostRequest $request, Post $post): RedirectResponse
	{

		$post->update();
		// Tags synchronisieren
		$post->tags()->sync($validated['tag_ids'] ?? []);

		return redirect()->back()->with('success', 'Post erfolgreich aktualisiert.');
	}

	public function destroy(Post $post): RedirectResponse
	{
		$post->delete($post->id);

		return redirect()->back()->with('success', 'Post gelöscht.');
	}
}
