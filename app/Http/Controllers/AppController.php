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
    /**
     * Display a listing of the resource.
     */
    public function index(): InertiaResponse
    {
        $apps = App::query()
            ->where('created_by', auth()->id())
            ->orderBy('position')
            ->latest('created_at')
            ->paginate(15);

        return inertia('apps/index', [
            'apps' => $apps,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaResponse
    {
        return inertia('apps/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Determine next position for this user's apps if not provided
        $next = App::where('created_by', auth()->id())->max('position');
        $position = array_key_exists('position', $validated) && $validated['position'] !== null
            ? (int) $validated['position']
            : (is_null($next) ? 0 : ((int) $next + 1));

        App::create([
            ...$validated,
            'position' => $position,
            'created_by' => auth()->id(),
        ]);

        return back()->with('success', 'App successfully created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(App $app): InertiaResponse
    {
        return inertia('apps/show', [
            'app' => $app,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(App $app): InertiaResponse
    {
        return inertia('apps/edit', [
            'app' => $app,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppRequest $request, App $app): RedirectResponse
    {
        $app->update($request->validated());

        return back()->with('success', 'App successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(App $app): RedirectResponse
    {
        abort_if((int) $app->created_by !== (int) auth()->id(), 403);

        $app->delete();

        return back()->with('success', 'App successfully deleted.');
    }

    /**
     * Reorder the authenticated user's apps by updating their position.
     */
    public function reorder(Request $request)
    {
        $data = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['uuid'],
        ]);

        $ids = $data['order'];

        // Ensure all provided IDs belong to the current user
        $ownedIds = App::query()
            ->where('created_by', auth()->id())
            ->whereIn('id', $ids)
            ->pluck('id')
            ->all();

        if (count($ownedIds) !== count($ids)) {
            abort(403, 'You are not allowed to reorder these apps.');
        }

        DB::transaction(function () use ($ids) {
            foreach ($ids as $index => $id) {
                App::where('id', $id)
                    ->where('created_by', auth()->id())
                    ->update(['position' => $index]);
            }
        });

        return response()->noContent();
    }
}
