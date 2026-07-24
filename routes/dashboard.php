<?php

use App\Http\Controllers\AppController;

use App\Http\Controllers\HyperlinkController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\DashboardController;

use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')
	->middleware(['auth', 'verified'])
	->group(function () {

		Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
		Route::patch('/apps/reorder', [AppController::class, 'reorder'])->name('apps.reorder');
		Route::resource('/apps', AppController::class);
		Route::resource('/hyperlinks', HyperlinkController::class);
		Route::resource('/categories', CategoryController::class);
		Route::resource('/tags', TagController::class);

		Route::get('/posts/create', [PageController::class, 'createPost'])->name('dashboard.posts.create');
	});
