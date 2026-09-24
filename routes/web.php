<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\HyperlinkController;
// Controllers for managing categories, posts, and tags in the dashboard
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
// Email routes for contact submission templates
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactSubmissionMail;

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/posts', [PageController::class, 'showPosts'])->name('public.posts.index');
Route::get('/hyperlinks', [PageController::class, 'showHyperlinks'])->name('public.hyperlinks.index');
Route::get('/chrome-extension', [PageController::class, 'index'])->name('chrome-extension.index');

Route::prefix('/dashboard')
	->middleware(['auth', 'verified'])
	->group(function () {

		Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
		Route::patch('/apps/reorder', [AppController::class, 'reorder'])->name('apps.reorder');
		Route::resource('/apps', AppController::class);
		Route::resource('/hyperlinks', HyperlinkController::class)->only(['index', 'store', 'update', 'destroy']);
		Route::resource('/categories', CategoryController::class);
		Route::resource('/tags', TagController::class);

		Route::resource('/posts', PostController::class)->only(['store', 'update', 'destroy']);
		Route::get('/posts/create', [PageController::class, 'createPost'])->name('dashboard.posts.create');
	});

require __DIR__ . '/settings.php';
require __DIR__ . '/legal-pages.php';

Route::get('/emails/templates/contact-submissions/trigger', function () {
	Mail::to(config('mail.from.address'))
		->queue(new ContactSubmissionMail());
	return response()->json("OK", 200);
});

Route::get('/emails/templates/contact-submissions/preview', function () {
	$mail = new ContactSubmissionMail();
	return $mail->render();
});
