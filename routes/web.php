<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\HyperlinkController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Hyperlinks
    Route::resource('/hyperlinks', HyperlinkController::class);
    // Route::get('/hyperlinks', [HyperlinkController::class, 'index']);
    Route::resource('hyperlinks', HyperlinkController::class);
});

// Hyperlinks

require __DIR__.'/settings.php';
