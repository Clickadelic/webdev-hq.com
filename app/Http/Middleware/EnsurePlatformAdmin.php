<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class EnsurePlatformAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');
        $rolePivotKey = $columnNames['role_pivot_key'] ?? 'role_id';
        $modelMorphKey = $columnNames['model_morph_key'] ?? 'model_id';

        $isPlatformAdmin = $user && DB::table($tableNames['model_has_roles'].' as model_roles')
            ->join($tableNames['roles'].' as roles', 'roles.id', '=', "model_roles.{$rolePivotKey}")
            ->where('model_roles.'.$modelMorphKey, $user->getKey())
            ->where('model_roles.model_type', $user->getMorphClass())
            ->where('roles.name', 'admin')
            ->where('roles.guard_name', config('auth.defaults.guard'))
            ->exists();

        abort_unless($isPlatformAdmin, 403);

        return $next($request);
    }
}
