<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// use Laravel\Fortify\Features;

use App\Http\Controllers\AppController;
use App\Http\Controllers\FrontpageController;
use App\Http\Controllers\HyperlinkController;
use App\Http\Controllers\PageController;
use App\Models\App as AppModel;

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/cookie-policy', [PageController::class, 'cookiePolicy'])->name('cookie-policy');
Route::get('/disclaimer', [PageController::class, 'disclaimer'])->name('disclaimer');
Route::get('/legal-notice', [PageController::class, 'legalNotice'])->name('legal-notice');
Route::get('/privacy-policy', [PageController::class, 'privatePolicy'])->name('privacy-policy');
Route::get('/terms-of-service', [PageController::class, 'termsOfService'])->name('terms-of-service');

Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('dashboard', function () {
		$apps = AppModel::query()
			->where('created_by', auth()->id())
			->orderBy('position')
			->get();

		return Inertia::render('dashboard', [
			'apps' => $apps,
		]);
	})->name('dashboard');

	Route::patch('/apps/reorder', [AppController::class, 'reorder'])->name('apps.reorder');
	Route::resource('/apps', AppController::class);
	Route::resource('/hyperlinks', HyperlinkController::class);
});

require __DIR__ . '/settings.php';
