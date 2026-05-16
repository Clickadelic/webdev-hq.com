<?php

namespace App\Http\Controllers;

use App\Models\Hyperlink;
use Inertia\Inertia;

class PageController extends Controller
{

	public function index()
	{
		$hyperlinks = Hyperlink::published()->get();

		return Inertia::render('welcome', [
			'hyperlinks' => $hyperlinks,
			'canRegister' => true, // Registration is always enabled
		]);
	}
	public function legalNotice()
	{
		return Inertia::render('legal-notice');
	}
	public function disclaimer()
	{
		return Inertia::render('disclaimer');
	}
	public function cookiePolicy()
	{
		return Inertia::render('cookie-policy');
	}
	public function privatePolicy()
	{
		return Inertia::render('privacy-policy');
	}
	public function termsOfService()
	{
		return Inertia::render('terms-of-service');
	}
}
