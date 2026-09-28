<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
