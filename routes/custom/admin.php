<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard/admin')
	->name('admin.')
	->middleware(['auth', 'verified', 'platform-admin'])
	->group(function () {
		Route::get('/', [AdminController::class, 'index'])->name('index');
		Route::get('/users', [AdminController::class, 'users'])->name('users');
		Route::get('/teams', [AdminController::class, 'teams'])->name('teams.index');
		Route::get('/teams/{team}', [AdminController::class, 'teamMembers'])->name('teams.show');
	});
