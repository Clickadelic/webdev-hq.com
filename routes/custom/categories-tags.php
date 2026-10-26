<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

// Protected Routes -> Categories and Tags
Route::middleware(['auth', 'verified'])->group(function () {
	Route::resource('/dashboard/categories', CategoryController::class);
	Route::resource('/dashboard/tags', TagController::class);
});
