<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Hyperlink;
use App\Models\Tag;
use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Requests\UpdateHyperlinkRequest;

class HyperlinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hyperlinks = Hyperlink::latest()->paginate(15);

        return inertia('hyperlinks/index', [
            'hyperlinks' => $hyperlinks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('hyperlinks/create', [
            'categories' => Category::orderBy('name')->get(),
            'tags' => Tag::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHyperlinkRequest $request)
    {
        $hyperlink = Hyperlink::create($request->safe()->except('tags'));

        if ($request->validated('tags')) {
            $hyperlink->tags()->sync($request->validated('tags'));
        }

        return redirect()
            ->route('hyperlinks.index')
            ->with('success', 'Hyperlink successfully created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Hyperlink $hyperlink)
    {
        return inertia('hyperlinks/show', [
            'hyperlink' => $hyperlink,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hyperlink $hyperlink)
    {
        return inertia('hyperlinks/edit', [
            'hyperlink' => $hyperlink->load('tags'),
            'categories' => Category::orderBy('name')->get(),
            'tags' => Tag::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHyperlinkRequest $request, Hyperlink $hyperlink)
    {
        $hyperlink->update($request->safe()->except('tags'));
        $hyperlink->tags()->sync($request->validated('tags', []));

        return redirect()
            ->route('hyperlinks.index')
            ->with('success', 'Hyperlink successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hyperlink $hyperlink)
    {
        $hyperlink->delete();

        return redirect()
            ->route('hyperlinks.index')
            ->with('success', 'Hyperlink successfully deleted.');
    }
}
