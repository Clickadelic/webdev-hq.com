<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactpageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HyperlinkController;
// Controllers for managing categories, posts, and tags in the dashboard
use App\Http\Controllers\PageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

// Email routes for contact submission templates
// use Illuminate\Support\Facades\Mail;
// use App\Mail\ContactSubmissionMail;

// Public Routes
Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/posts', [PostController::class, 'showPosts'])->name('public.posts.index');
Route::get('/hyperlinks', [HyperlinkController::class, 'publicIndex'])->name('hyperlinks.index');
Route::get('/chrome-extension', [PageController::class, 'chromeExtension'])->name('chrome-extension.index');
Route::get('/contact', [ContactpageController::class, 'index'])->name('contact.index');
Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');

// Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Apps
    Route::resource('/apps', AppController::class);
    Route::patch('/apps/reorder', [AppController::class, 'reorder'])->name('apps.reorder');
    // Posts
    Route::resource('/dashboard/posts', PostController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    // Hyperlinks
    Route::get('/dashboard/hyperlinks', [HyperlinkController::class, 'index'])->name('dashboard.hyperlinks.index');
    Route::post('/dashboard/hyperlinks', [HyperlinkController::class, 'store'])->name('hyperlinks.store');
    Route::put('/dashboard/hyperlinks/{hyperlink}', [HyperlinkController::class, 'update'])->name('hyperlinks.update');
    Route::delete('/dashboard/hyperlinks/{hyperlink}', [HyperlinkController::class, 'destroy'])->name('hyperlinks.destroy');
    // Categories
    Route::resource('/dashboard/categories', CategoryController::class);
    // Tags
    Route::resource('/dashboard/tags', TagController::class);
});

// Route::get('/emails/templates/contact-submissions/trigger', function () {
// 	Mail::to(config('mail.from.address'))
// 		->queue(new ContactSubmissionMail());
// 	return response()->json("OK", 200);
// });

// Route::get('/emails/templates/contact-submissions/preview', function () {
// 	$mail = new ContactSubmissionMail();
// 	return $mail->render();
// });

require __DIR__.'/settings.php';
require __DIR__.'/legal-pages.php';
