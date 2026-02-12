<?php

namespace App\Http\Controllers;

use App\Models\Hyperlink;
use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Requests\UpdateHyperlinkRequest;

class HyperlinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $hyperlinks = Hyperlink::query()
            ->with('category')
            ->orderByDesc('is_featured')
            ->orderBy('title')
            ->paginate(24);

        return inertia('hyperlinks/Index', compact('hyperlinks'));
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
    public function store(StoreHyperlinkRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Hyperlink $hyperlink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hyperlink $hyperlink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHyperlinkRequest $request, Hyperlink $hyperlink)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hyperlink $hyperlink)
    {
        //
    }
}
