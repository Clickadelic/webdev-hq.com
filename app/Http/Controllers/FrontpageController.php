<?php

namespace App\Http\Controllers;

use App\Models\Hyperlink;
use Inertia\Inertia;

class FrontpageController extends Controller
{
    public function index()
    {
        $hyperlinks = Hyperlink::published()->get();

        return Inertia::render('welcome', [
            'hyperlinks' => $hyperlinks,
            'canRegister' => true, // Registration is always enabled
        ]);
    }
}
