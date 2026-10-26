<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');

// Protected Routes -> Posts
Route::middleware(['auth', 'verified'])->group(function () {
	Route::resource('/dashboard/posts', DashboardController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
});
