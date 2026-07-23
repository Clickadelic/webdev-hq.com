<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Models\Hyperlink;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{

	public function index()
	{
		$apps = App::query()
			->where('created_by', Auth::id())
			->orderBy('position', 'asc')
			->latest('created_at')
			->get();

		$query = Hyperlink::with(['category', 'tags']);

		if ($search = request('search')) {
			$query->where(function ($q) use ($search) {
				$q->where('title', 'like', "%{$search}%")
					->orWhere('url', 'like', "%{$search}%")
					->orWhere('category', 'like', "%{$search}%")
					->orWhere('description', 'like', "%{$search}%");
			});
		}

		$hyperlinks = $query->latest()->paginate(35)->withQueryString();

		return Inertia::render('dashboard/index', [
			'apps' => $apps,
			'hyperlinks' => $hyperlinks,
		]);
	}
}
