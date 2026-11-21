<?php

namespace App\Http\Controllers\Api;

use App\Actions\ResolveTagIds;
use App\Http\Controllers\Controller;
use App\Http\Requests\HyperlinkRequest;
use App\Http\Requests\StoreHyperlinkRequest;
use App\Models\Category;
use App\Models\Hyperlink;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class HyperlinkController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'hyperlinks' => Hyperlink::with(['category', 'tags'])
                ->latest()
                ->paginate(38),
        ]);
    }

    /**
     * Search published hyperlinks for dropdown suggestions.
     * Accepts a query parameter to search across all published hyperlinks.
     */
    public function search(): JsonResponse
    {
        $query = trim((string) request()->query('q', ''));

        if (blank($query)) {
            return response()->json(['hyperlinks' => []]);
        }

        $hyperlinks = Hyperlink::with(['category', 'tags'])
            ->published()
            ->where(function ($q) use ($query) {
                $q
                    ->where('title', 'like', "%{$query}%")
                    ->orWhere('url', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhereHas('tags', fn ($t) => $t->where('name', 'like', "%{$query}%"))
                    ->orWhereHas('category', fn ($t) => $t->where('name', 'like', "%{$query}%"));
            })
            ->distinct()
            ->latest()
            ->limit(20)
            ->get();

        return response()->json(['hyperlinks' => $hyperlinks]);
    }

    /**
     * Store a newly created hyperlink via API (JSON response).
     */
    public function store(StoreHyperlinkRequest $request): JsonResponse
    {
        $data = $request->safe()->except(['tags', 'category']);
        $data['created_by'] = $request->user()->id;

        $hyperlink = DB::transaction(function () use ($data, $request) {
            $teamId = $request->validated('team_id');
            $tagIds = app(ResolveTagIds::class)($request->validated('tags', []), $request->user(), $teamId === null ? null : (int) $teamId);
            $data['category_id'] = $this->resolveCategoryId($request->validated('category'));
            $hyperlink = Hyperlink::create($data);
            $hyperlink->tags()->sync($tagIds);

            return $hyperlink;
        });

        return response()->json(['hyperlink' => $hyperlink], 201);
    }

    public function destroy(HyperlinkRequest $request, Hyperlink $hyperlink): JsonResponse
    {
        $hyperlink->delete($hyperlink->id);

        return response()->json(['message' => 'Hyperlink deleted successfully.'], 200);
    }

    /**
     * Resolve a category value (numeric ID or name) to a category ID.
     */
    private function resolveCategoryId(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        if (Str::isUuid($value)) {
            return $value;
        }

        return Category::firstOrCreate(
            ['name' => $value],
            ['slug' => Str::slug($value)]
        )->id;
    }
}
