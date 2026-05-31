<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$categories = Category::withCount('hyperlinks')->latest()->paginate(15);

		return inertia('categories/index', [
			'categories' => $categories,
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreCategoryRequest $request)
	{
		$data = $request->validated();
		$data['slug'] = $data['slug'] ?? Str::slug($data['name']);

		Category::create($data);

		return back()->with('success', 'Category successfully created.');
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateCategoryRequest $request, Category $category)
	{
		$data = $request->validated();
		$data['slug'] = $data['slug'] ?? Str::slug($data['name']);

		$category->update($data);

		return back()->with('success', 'Category successfully updated.');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Category $category)
	{
		$category->delete();

		return back()->with('success', 'Category successfully deleted.');
	}
}
