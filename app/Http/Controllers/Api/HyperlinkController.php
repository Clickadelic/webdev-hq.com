<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hyperlink;
use Illuminate\Http\JsonResponse;

class HyperlinkController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'hyperlinks' => Hyperlink::appListing(),
        ]);
    }
}
