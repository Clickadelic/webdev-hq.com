<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\HyperlinkRequest;
use App\Http\Requests\StoreHyperlinkRequest;
use App\Models\Category;
use App\Models\Hyperlink;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
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
        $data['category_id'] = $this->resolveCategoryId($request->validated('category'));
        $data['created_by'] = $request->user()->id;

        $hyperlink = Hyperlink::create($data);
        $hyperlink->tags()->sync($this->resolveTagIds($request->validated('tags', [])));

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
}
