<?php

use App\Http\Controllers\AppController;

use App\Http\Controllers\HyperlinkController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\DashboardController;

use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/cookie-policy', [PageController::class, 'cookiePolicy'])->name('cookie-policy');
Route::get('/disclaimer', [PageController::class, 'disclaimer'])->name('disclaimer');
Route::get('/legal-notice', [PageController::class, 'legalNotice'])->name('legal-notice');
Route::get('/privacy-policy', [PageController::class, 'privatePolicy'])->name('privacy-policy');
Route::get('/terms-of-service', [PageController::class, 'termsOfService'])->name('terms-of-service');

Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
	Route::patch('/apps/reorder', [AppController::class, 'reorder'])->name('apps.reorder');
	Route::resource('/apps', AppController::class);
	Route::resource('/hyperlinks', HyperlinkController::class);
	Route::resource('/categories', CategoryController::class);
});

require __DIR__ . '/settings.php';

if (config('app.debug')) {
	require __DIR__ . '/dev.php';
}
