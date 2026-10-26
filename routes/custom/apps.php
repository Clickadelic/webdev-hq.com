<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
	Route::resource('/apps', AppController::class);
	Route::patch('/apps/reorder', [AppController::class, 'reorder'])->name('apps.reorder');
});
