<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use Illuminate\Support\Str;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::withCount('hyperlinks')->latest()->paginate(15);

        return inertia('tags/index', [
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        Tag::create($data);

        return back()->with('success', 'Tag successfully created.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        $tag->update($data);

        return back()->with('success', 'Tag successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();

        return back()->with('success', 'Tag successfully deleted.');
    }
}
