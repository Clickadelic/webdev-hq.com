<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/admin/index');
    }

    public function users()
    {
        return Inertia::render('dashboard/admin/users');
    }
}
