<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Http\Requests\StoreAppRequest;
use App\Http\Requests\UpdateAppRequest;
// use App\Models\User;

class AppController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Apps
        $apps = App::all();

        return inertia('apps/index', [
            'apps' => $apps,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppRequest $request)
    {
        $validated = $request->validated();

        // $userId = User::id();

        $app = App::create([
            ...$validated,
            // 'created_by' => $userId,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('apps.show', $app);
    }

    /**
     * Display the specified resource.
     */
    public function show(App $app)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(App $app)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppRequest $request, App $app)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(App $app)
    {
        //
    }
}