<?php

use App\Http\Controllers\Api\AppController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\HyperlinkController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TagController;
use Illuminate\Support\Facades\Route;

// Alle Routen unter dem Präfix v1 zusammengefasst
Route::prefix('v1')->group(function () {

	// Unsplash Image Service Routes (public)
	Route::prefix('/unsplash/image')->middleware('throttle:60,10')->group(function () {
		Route::get('/', [ImageController::class, 'index']);
		Route::get('/seasonal', [ImageController::class, 'seasonal']);
		Route::get('/general', [ImageController::class, 'general']);
	});

	Route::prefix('auth')->group(function () {
		// Public auth routes (no auth required)
		Route::post('/login', [AuthController::class, 'login']);
		Route::middleware('auth:sanctum')->post('/register', [AuthController::class, 'register']);

		// Protected routes (require Sanctum token)
		Route::middleware('auth:sanctum')->group(function () {
			Route::get('/user', [AuthController::class, 'user']);
			Route::get('/me', [AuthController::class, 'me']);
			Route::post('/logout', [AuthController::class, 'logout']);
		});
	});

	Route::middleware('auth:sanctum')->as('api.')->group(function () {
		Route::apiResource('apps', AppController::class);
		Route::apiResource('categories', CategoryController::class);
		Route::apiResource('tags', TagController::class);
		Route::apiResource('hyperlinks', HyperlinkController::class);
	});
});
