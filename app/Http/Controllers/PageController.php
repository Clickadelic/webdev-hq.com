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
		return Inertia('legal-notice');
	}
	public function disclaimer()
	{
		return Inertia('disclaimer');
	}
	public function cookiePolicy()
	{
		return Inertia('cookie-policy');
	}
	public function privatePolicy()
	{
		return Inertia('privacy-policy');
	}
	public function termsOfService()
	{
		return Inertia('terms-of-service');
	}
}
