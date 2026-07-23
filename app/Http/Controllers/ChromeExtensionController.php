<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ChromeExtensionController extends Controller
{
	public function index()
	{
		return Inertia::render('resources', [
			'canRegister' => true,
		]);
	}
}
