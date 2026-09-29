<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(): JsonResponse
	{
		$categories = Category::withCount('hyperlinks')->latest()->paginate(15);

		return response()->json([
			'categories' => $categories,
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreCategoryRequest $request): JsonResponse
	{
		$data = $request->validated();
		$data['slug'] = $data['slug'] ?? Str::slug($data['name']);

		Category::create($data);

		return response()->json(['message' => 'Category successfully created.'], 201);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
	{
		$data = $request->validated();
		$data['slug'] = $data['slug'] ?? Str::slug($data['name']);

		$category->update($data);

		return response()->json(['message' => 'Category successfully updated.'], 200);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Category $category): JsonResponse
	{
		$category->delete($category->id);

		return response()->json(['message' => 'Category successfully deleted.'], 200);
	}
}
