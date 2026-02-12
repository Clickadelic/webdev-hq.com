<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Http\Requests\StoreAppRequest;
use App\Http\Requests\UpdateAppRequest;


class AppController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    // TODO: Store a newly created resource in storage
    public function store(StoreAppRequest $request)
    {
        $validated = $request->validated();

        $app = App::create($validated);

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
