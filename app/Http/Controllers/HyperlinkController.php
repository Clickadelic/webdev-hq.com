<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Requests\UpdateHyperlinkRequest;
use App\Models\Category;
use App\Models\Hyperlink;
use App\Models\Tag;
use Illuminate\Support\Str;

class HyperlinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('hyperlinks/index', [
            'hyperlinks' => Hyperlink::appListing(),
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
        $data = $request->safe()->except(['tags', 'category']);

        // Handle category: can be numeric ID or new category name
        $categoryValue = $request->validated('category');
        if ($categoryValue) {
            if (is_numeric($categoryValue)) {
                $data['category_id'] = (int) $categoryValue;
            } else {
                // Create new category or find existing by name
                $category = Category::firstOrCreate(
                    ['name' => $categoryValue],
                    ['slug' => Str::slug($categoryValue)]
                );
                $data['category_id'] = $category->id;
            }
        }

        $hyperlink = Hyperlink::create($data);

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
