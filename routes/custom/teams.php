<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
	Route::post('/teams', [TeamController::class, 'store'])->name('teams.store');
	Route::delete('/settings/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
	Route::post('/settings/teams/{team}/members', [TeamController::class, 'addMember'])->name('teams.members.store');
	Route::delete('/settings/teams/{team}/members/{member}', [TeamController::class, 'removeMember'])->name('teams.members.destroy');
	Route::get('/settings/teams/{team}/edit', [TeamController::class, 'edit'])->name('teams.edit');
	Route::patch('/settings/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
});
