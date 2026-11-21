<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('tags', 'team_id')) {
            Schema::table('tags', function (Blueprint $table) {
                $table->foreignId('team_id')->nullable()->after('id')->constrained('teams')->nullOnDelete();
            });
        }

        if (! Schema::hasColumn('tags', 'created_by')) {
            Schema::table('tags', function (Blueprint $table) {
                $table->foreignUuid('created_by')->nullable()->after('team_id')->constrained('users')->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        // The columns may have existed before this migration; leave them intact on rollback.
    }
};
