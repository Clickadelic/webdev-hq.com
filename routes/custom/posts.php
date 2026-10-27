<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');

// Protected Routes -> Posts
Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('/dashboard/posts', [PostController::class, 'listPosts'])->name('posts.listPosts');
	Route::get('/dashboard/posts/create', [PostController::class, 'create'])->name('posts.create');
	// Temp
	Route::post('/dashboard/posts', [PostController::class, 'store'])->name('posts.store');
	Route::get('/dashboard/posts/{post:slug}/edit', [PostController::class, 'edit'])->name('posts.edit');
	Route::put('/dashboard/posts/{post:slug}', [PostController::class, 'update'])->name('posts.update');
	Route::delete('/dashboard/posts/{post:slug}', [PostController::class, 'destroy'])->name('posts.destroy');
});
