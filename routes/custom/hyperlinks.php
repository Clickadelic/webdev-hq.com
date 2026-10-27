<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HyperlinkController;

Route::get('/hyperlinks', [HyperlinkController::class, 'publicIndex'])->name('hyperlinks.index');

// Protected Routes -> Hyperlinks
Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
	Route::get('/hyperlinks', [HyperlinkController::class, 'index'])->name('dashboard.hyperlinks.index');
	Route::post('/hyperlinks', [HyperlinkController::class, 'store'])->name('hyperlinks.store');
	Route::put('/hyperlinks/{hyperlink}', [HyperlinkController::class, 'update'])->name('hyperlinks.update');
	Route::delete('/hyperlinks/{hyperlink}', [HyperlinkController::class, 'destroy'])->name('hyperlinks.destroy');
});
