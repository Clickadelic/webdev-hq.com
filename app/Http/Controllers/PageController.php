<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {

        return Inertia::render('home', [
            'canRegister' => true,
        ]);
    }

    public function legalIndex()
    {
        return Inertia::render('legal/index');
    }

    public function legalNotice()
    {
        return Inertia::render('legal/legal-notice');
    }

    public function disclaimer()
    {
        return Inertia::render('legal/disclaimer');
    }

    public function cookiePolicy()
    {
        return Inertia::render('legal/cookie-policy');
    }

    public function privatePolicy()
    {
        return Inertia::render('legal/privacy-policy');
    }

    public function termsOfService()
    {
        return Inertia::render('legal/terms-of-service');
    }

    public function chromeExtension()
    {
        return Inertia::render('chrome-extension/index');
    }

    public function showPosts()
    {
        return Inertia::render('posts/index', [
            'posts' => Post::appListing(),
            'canRegister' => true,
        ]);
    }

    public function createPost()
    {
        return Inertia::render('dashboard/create-post');
    }
}
