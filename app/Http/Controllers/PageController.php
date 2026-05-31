<?php

namespace App\Http\Controllers;

use App\Models\Hyperlink;
use Inertia\Inertia;

class PageController extends Controller
{

	public function index()
	{
		$hyperlinks = Hyperlink::with(['category', 'tags'])->published()->get();

		return Inertia::render('home', [
			'hyperlinks' => $hyperlinks,
			'canRegister' => true, // Registration is always enabled
		]);
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
}
