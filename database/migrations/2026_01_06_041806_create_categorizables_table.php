<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Kept as a no-op: file still exists on the server from a prior
        // deployment but was removed from git — restored with a createIfNotExists
        // guard to prevent failures on databases where it was already run.
        if (!Schema::hasTable('categorizables')) {
            Schema::create('categorizables', function (Blueprint $table) {
                $table->id();
                $table->foreignId('category_id')->constrained()->cascadeOnDelete();
                $table->morphs('categorizable');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('categorizables');
    }
};
