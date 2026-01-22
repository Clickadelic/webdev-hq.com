<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Status;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apps', function (Blueprint $table) {
            // Primary Key
            $table->uuid('id')->primary();

            // Core data
            $table->string('title');
            $table->string('url');
            $table->string('target')->default('_self');

            // Meta / Content
            $table->text('description')->nullable();

            // Ownership / Author (BIGINT → users.id)
            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // Optional extensions
            $table->string('status')->default(Status::Published->value);

            // Housekeeping
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apps');
    }
};
