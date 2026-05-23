<?php

namespace App\Http\Controllers;

use App\Models\App;
use Inertia\Inertia;

class DashboardController extends Controller
{

	public function index()
	{
		$apps = App::query()
			->where('created_by', auth()->id())
			->orderBy('position')
			->latest('created_at')
			->get();

		return Inertia::render('dashboard', [
			'apps' => $apps,
		]);
	}
	
}
