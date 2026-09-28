<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactpageController;
use App\Http\Controllers\DashboardAdminController;
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
require __DIR__.'/settings.php';
require __DIR__.'/legal-pages.php';

// Protected Routes -> Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::prefix('dashboard/admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'platform-admin'])
    ->group(function () {
        Route::get('/', [DashboardAdminController::class, 'index'])->name('index');
        Route::get('/users', [DashboardAdminController::class, 'users'])->name('users');
    });

// Protected Routes -> Apps
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('/apps', AppController::class);
    Route::patch('/apps/reorder', [AppController::class, 'reorder'])->name('apps.reorder');
});

// Protected Routes -> Posts
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('/dashboard/posts', PostController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
});

// Protected Routes -> Teams
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
    Route::post('/teams', [TeamController::class, 'store'])->name('teams.store');
    Route::delete('/settings/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
    Route::post('/settings/teams/{team}/members', [TeamController::class, 'addMember'])->name('teams.members.store');
    Route::delete('/settings/teams/{team}/members/{member}', [TeamController::class, 'removeMember'])->name('teams.members.destroy');
    Route::get('/settings/teams/{team}/edit', [TeamController::class, 'edit'])->name('teams.edit');
    Route::patch('/settings/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
});

// Protected Routes -> Hyperlinks
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/hyperlinks', [HyperlinkController::class, 'index'])->name('dashboard.hyperlinks.index');
    Route::post('/dashboard/hyperlinks', [HyperlinkController::class, 'store'])->name('hyperlinks.store');
    Route::put('/dashboard/hyperlinks/{hyperlink}', [HyperlinkController::class, 'update'])->name('hyperlinks.update');
    Route::delete('/dashboard/hyperlinks/{hyperlink}', [HyperlinkController::class, 'destroy'])->name('hyperlinks.destroy');
});

// Protected Routes -> Categories and Tags
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('/dashboard/categories', CategoryController::class);
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
