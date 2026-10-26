<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HyperlinkController;

Route::get('/hyperlinks', [HyperlinkController::class, 'publicIndex'])->name('hyperlinks.index');

// Protected Routes -> Hyperlinks
Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('/dashboard/hyperlinks', [HyperlinkController::class, 'index'])->name('dashboard.hyperlinks.index');
	Route::post('/dashboard/hyperlinks', [HyperlinkController::class, 'store'])->name('hyperlinks.store');
	Route::put('/dashboard/hyperlinks/{hyperlink}', [HyperlinkController::class, 'update'])->name('hyperlinks.update');
	Route::delete('/dashboard/hyperlinks/{hyperlink}', [HyperlinkController::class, 'destroy'])->name('hyperlinks.destroy');
});
