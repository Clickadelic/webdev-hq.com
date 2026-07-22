<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Column already added in create_apps_table migration.
        // Kept as a no-op: file still exists on the server from a prior
        // deployment but was removed from git — restored with a guard to
        // prevent duplicate-column failures.
        if (!Schema::hasColumn('apps', 'favicon_url')) {
            Schema::table('apps', function (Blueprint $table) {
                $table->string('favicon_url', 2048)->nullable()->after('url');
            });
        }
    }

    public function down(): void
    {
        // Intentionally left blank — column ownership belongs to create_apps_table.
    }
};
