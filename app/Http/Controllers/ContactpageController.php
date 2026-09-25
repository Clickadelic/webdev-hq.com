<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ContactpageController extends Controller
{
    public function index()
    {

        return Inertia::render('contact/index', [
            'canRegister' => true,
        ]);
    }
}
