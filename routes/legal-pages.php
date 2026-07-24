<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'legal'], function () {
	Route::get('/', [PageController::class, 'legalIndex'])->name('legal-index');
	Route::get('/cookie-policy', [PageController::class, 'cookiePolicy'])->name('cookie-policy');
	Route::get('/disclaimer', [PageController::class, 'disclaimer'])->name('disclaimer');
	Route::get('/legal-notice', [PageController::class, 'legalNotice'])->name('legal-notice');
	Route::get('/privacy-policy', [PageController::class, 'privatePolicy'])->name('privacy-policy');
	Route::get('/terms-of-service', [PageController::class, 'termsOfService'])->name('terms-of-service');
});
