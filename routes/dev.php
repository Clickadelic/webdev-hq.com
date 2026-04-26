<?php

use App\Models\App as AppModel;
use Illuminate\Support\Facades\Auth;
// use Laravel\Fortify\Features;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $apps = AppModel::query()
            ->where('created_by', Auth::id())
            ->orderBy('position')
            ->get();

        return Inertia::render('dashboard', [
            'apps' => $apps,
        ]);
    })->name('dashboard');
});
