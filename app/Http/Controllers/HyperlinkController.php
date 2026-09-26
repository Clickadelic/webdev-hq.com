<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Requests\UpdateHyperlinkRequest;
use App\Models\Category;
use App\Models\Hyperlink;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HyperlinkController extends Controller
{
    /**
     * Display published hyperlinks publicly.
     */
    public function publicIndex(Request $request)
    {
        $search = trim((string) $request->query('search', ''));

        $query = Hyperlink::with(['category', 'tags'])
            ->published();

        if ($search !== '') {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('url', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $hyperlinks = $query
            ->latest()
            ->paginate(38)
            ->withQueryString();

        return inertia('hyperlinks/index', [
            'hyperlinks' => $hyperlinks,
            'categories' => Category::orderBy('name', 'asc')->get(['id', 'name', 'slug']),
            'tags' => Tag::orderBy('name', 'asc')->get(['id', 'name', 'slug']),
            'canRegister' => true,
            'search' => $search,
        ]);
    }

    /**
     * Display the dashboard hyperlink list.
     */
    public function index()
    {
        $user = request()->user();
        $teamIds = $user->teams()->pluck('teams.id');

        $hyperlinks = Hyperlink::with(['category', 'tags'])
            ->where(function ($query) use ($user, $teamIds) {
                $query
                    ->whereIn('team_id', $teamIds)
                    ->orWhere(function ($query) use ($user) {
                        $query
                            ->whereNull('team_id')
                            ->where('created_by', $user->id);
                    });
            })
            ->latest()
            ->paginate(38);

        return inertia('dashboard/hyperlinks', [
            'hyperlinks' => $hyperlinks,
            'categories' => Category::orderBy('name', 'asc')->get(['id', 'name', 'slug']),
            'tags' => Tag::orderBy('name', 'asc')->get(['id', 'name', 'slug']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('hyperlinks/create', [
            'categories' => Category::orderBy('name', 'asc')->get(['id', 'name', 'slug']),
            'tags' => Tag::orderBy('name', 'asc')->get(['id', 'name', 'slug']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHyperlinkRequest $request)
    {
        $data = $request->safe()->except(['tags', 'category']);
        $data['category_id'] = $this->resolveCategoryId($request->validated('category'));
        $data['created_by'] = $request->user()->id;
        $data['team_id'] = $request->user()->teams()->value('teams.id');

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
            'categories' => Category::orderBy('name', 'asc')->get(['id', 'name', 'slug']),
            'tags' => Tag::orderBy('name', 'asc')->get(['id', 'name', 'slug']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHyperlinkRequest $request, Hyperlink $hyperlink)
    {
        $request->user()->can('update', $hyperlink) ?: abort(403);

        $data = $request->safe()->except(['tags', 'category']);
        $data['category_id'] = $this->resolveCategoryId($request->validated('category'));

        $hyperlink->fill($data)->save();
        $hyperlink->tags()->sync($this->resolveTagIds($request->validated('tags', [])));

        return redirect()
            ->back()
            ->with('success', 'Hyperlink successfully updated.');
    }

    /**
     * Resolve a category value (numeric ID or name) to a category ID.
     */
    private function resolveCategoryId(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        if (is_numeric($value)) {
            return (string) $value;
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
     * @return array<int, string>
     */
    private function resolveTagIds(array $values): array
    {
        return collect($values)->map(function (string $value) {
            if (is_numeric($value)) {
                return (string) $value;
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
        request()->user()->can('delete', $hyperlink) ?: abort(403);

        Hyperlink::query()
            ->whereKey($hyperlink->getKey())
            ->delete();

        return redirect()
            ->back()
            ->with('success', 'Hyperlink successfully deleted.');
    }
}
