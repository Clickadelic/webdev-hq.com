<?php

namespace App\Http\Controllers;

use App\Models\Hyperlink;
use Inertia\Inertia;

class PageController extends Controller
{


	public function index()
	{
		$query = Hyperlink::with(['category', 'tags'])->published();

		if ($search = request('search')) {
			$query->where(function ($q) use ($search) {
				$q->where('title', 'like', "%{$search}%")
				  ->orWhere('url', 'like', "%{$search}%")
				  ->orWhere('description', 'like', "%{$search}%");
			});
		}

		$hyperlinks = $query->latest()->paginate(18)->withQueryString();

		return Inertia::render('home', [
			'hyperlinks' => $hyperlinks,
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
}
