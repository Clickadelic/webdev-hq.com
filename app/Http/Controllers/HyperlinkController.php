<?php

namespace App\Http\Controllers;

use App\Actions\ResolveTagIds;
use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Requests\UpdateHyperlinkRequest;
use App\Models\Category;
use App\Models\Hyperlink;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                $query
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('url', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('tags', fn ($q) => $q->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('category', fn ($q) => $q->where('name', 'like', "%{$search}%"));
            });
        }

        $hyperlinks = $query
            ->distinct()
            ->latest()
            ->paginate(30)
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

        return inertia('dashboard/hyperlinks/index', [
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
        $data['created_by'] = $request->user()->id;
        $selectedTeamId = $request->validated('team_id');
        $data['team_id'] = $selectedTeamId ?? $request->user()->teams()->value('teams.id');

        DB::transaction(function () use ($data, $request, $selectedTeamId) {
            $tagIds = app(ResolveTagIds::class)($request->validated('tags', []), $request->user(), $selectedTeamId === null ? null : (int) $selectedTeamId);
            $data['category_id'] = $this->resolveCategoryId($request->validated('category'));
            $hyperlink = Hyperlink::create($data);
            $hyperlink->tags()->sync($tagIds);
        });

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
        unset($data['team_id']);
        $selectedTeamId = $request->validated('team_id');
        $teamId = $hyperlink->team_id ?? $selectedTeamId;

        DB::transaction(function () use ($data, $request, $hyperlink, $teamId) {
            $tagIds = app(ResolveTagIds::class)($request->validated('tags', []), $request->user(), $teamId === null ? null : (int) $teamId);
            $data['category_id'] = $this->resolveCategoryId($request->validated('category'));
            if ($hyperlink->team_id === null && $teamId !== null) {
                $data['team_id'] = $teamId;
            }
            $hyperlink->fill($data)->save();
            $hyperlink->tags()->sync($tagIds);
        });

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

        if (Str::isUuid($value) || is_numeric($value)) {
            return (string) $value;
        }

        return Category::firstOrCreate(
            ['name' => $value],
            ['slug' => Str::slug($value)]
        )->id;
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
