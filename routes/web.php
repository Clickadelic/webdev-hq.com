<?php

use App\Http\Controllers\PageController;

use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/posts', [PageController::class, 'showPosts'])->name('posts.show');
Route::get('/hyperlinks', [PageController::class, 'showHyperlinks'])->name('hyperlinks.show');
Route::get('/chrome-extension', [PageController::class, 'index'])->name('chrome-extension.index');

require __DIR__ . '/dashboard.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/legal-pages.php';

if (config('app.debug')) {
	require __DIR__ . '/dev.php';
}
