<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\HyperlinkController;
use Illuminate\Support\Facades\Route;

// Public auth routes (no auth required)
Route::post('/login', [AuthController::class, 'login']);

// Unsplash Image Service Routes (public)
Route::prefix('unsplash/image')->middleware('throttle:60,10')->group(function () {
	Route::get('/seasonal', [ImageController::class, 'seasonal']);
	Route::get('/general', [ImageController::class, 'general']);
});

// Protected routes (require Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
	Route::get('/user', function (Request $request) {
		return $request->user();
	});

	Route::get('/me', [AuthController::class, 'me']);
	Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->as('api.')->group(function () {
	Route::apiResource('hyperlinks', HyperlinkController::class);
});
