<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ImageController;
use App\Models\User;
use Illuminate\Http\Request;
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

Route::group(['middleware' => ['auth:sanctum']], function () {
	Route::post('/register', function (Request $request) {
		$data = $request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|email|unique:users,email',
			'password' => 'required|string|min:8|confirmed',
		]);

		User::create([
			'name' => $data['name'],
			'email' => $data['email'],
			'password' => $data['password'], // 'hashed' cast on User will hash this
		]);

		return response()->json(['message' => 'Registered'], 201);
	});
});
