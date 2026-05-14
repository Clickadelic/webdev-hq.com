<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Http\Requests\StoreAppRequest;
use App\Http\Requests\UpdateAppRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response as InertiaResponse;

class AppController extends Controller
{

	public function index(): InertiaResponse
	{
		$apps = AppModel::query()
			->where('created_by', Auth::id())
			->orderBy('position')
			->get();

		return Inertia::render('dashboard', [
			'apps' => $apps,
		]);
	}
}
