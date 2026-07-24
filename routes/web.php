<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ChromeExtensionController;

use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/chrome-extension', [ChromeExtensionController::class, 'index'])->name('chrome-extension.index');

require __DIR__ . '/dashboard.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/legal-pages.php';

if (config('app.debug')) {
	require __DIR__ . '/dev.php';
}
