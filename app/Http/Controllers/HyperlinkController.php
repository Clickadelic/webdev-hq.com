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
        $hyperlinks = Hyperlink::with(['category', 'tags'])
            ->latest()
            ->paginate(15);

        return inertia('hyperlinks/index', [
            'hyperlinks' => $hyperlinks,
            'tags' => Tag::orderBy('name')->get(),
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
        $data['category_id'] = $this->resolveCategoryId($request->validated('category'));

        $hyperlink = Hyperlink::create($data);
        $hyperlink->tags()->sync($this->resolveTagIds($request->validated('tags', [])));

        return redirect()
            ->back()
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
        $data = $request->safe()->except(['tags', 'category']);
        $data['category_id'] = $this->resolveCategoryId($request->validated('category'));

        $hyperlink->update($data);
        $hyperlink->tags()->sync($this->resolveTagIds($request->validated('tags', [])));

        return redirect()
            ->route('hyperlinks.index')
            ->with('success', 'Hyperlink successfully updated.');
    }

    /**
     * Resolve a category value (numeric ID or name) to a category ID.
     */
    private function resolveCategoryId(?string $value): ?int
    {
        if (! $value) {
            return null;
        }

        if (is_numeric($value)) {
            return (int) $value;
        }

        return Category::firstOrCreate(
            ['name' => $value],
            ['slug' => Str::slug($value)]
        )->id;
    }

    /**
     * Resolve an array of tag values (numeric IDs or names) to tag IDs.
     *
     * @param  array<int, string>  $values
     * @return array<int, int>
     */
    private function resolveTagIds(array $values): array
    {
        return collect($values)->map(function (string $value) {
            if (is_numeric($value)) {
                return (int) $value;
            }

            return Tag::firstOrCreate(
                ['name' => $value],
                ['slug' => Str::slug($value)]
            )->id;
        })->all();
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
