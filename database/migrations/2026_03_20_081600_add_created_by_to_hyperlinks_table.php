<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Column is already added by create_hyperlinks_table migration.
        // This migration is kept as a no-op to avoid failures on servers
        // that still have this file on disk from a previous deployment.
        if (!Schema::hasColumn('hyperlinks', 'created_by')) {
            Schema::table('hyperlinks', function (Blueprint $table) {
                $table->foreignId('created_by')->nullable()->after('status');
            });
        }
    }

    public function down(): void
    {
        // Intentionally left blank — column ownership belongs to create_hyperlinks_table.
    }
};
