<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ContactpageController;
use Illuminate\Support\Facades\Route;


Route::get('/', [PageController::class, 'index'])->name('index');

Route::group(['prefix' => 'legal'], function () {
	Route::get('/cookie-policy', [PageController::class, 'cookiePolicy'])->name('cookie-policy');
	Route::get('/disclaimer', [PageController::class, 'disclaimer'])->name('disclaimer');
	Route::get('/legal-notice', [PageController::class, 'legalNotice'])->name('legal-notice');
	Route::get('/privacy-policy', [PageController::class, 'privatePolicy'])->name('privacy-policy');
	Route::get('/terms-of-service', [PageController::class, 'termsOfService'])->name('terms-of-service');
});

Route::get('/chrome-extension', [PageController::class, 'chromeExtension'])->name('chrome-extension.index');
Route::get('/contact', [ContactpageController::class, 'index'])->name('contact.index');
