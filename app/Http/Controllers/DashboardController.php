<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Models\Hyperlink;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = request()->user();
        $teamIds = $user->teams()->pluck('teams.id');

        $apps = App::query()
            ->where('created_by', $user->id)
            ->orderBy('position', 'asc')
            ->latest('created_at')
            ->get();

        $query = Hyperlink::with(['category', 'tags'])
            ->where(function ($query) use ($user, $teamIds) {
                $query
                    ->whereIn('team_id', $teamIds)
                    ->orWhere(function ($query) use ($user) {
                        $query
                            ->whereNull('team_id')
                            ->where('created_by', $user->id);
                    });
            });

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
