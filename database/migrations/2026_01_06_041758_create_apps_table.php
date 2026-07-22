<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		Schema::create('apps', function (Blueprint $table) {
			$table->uuid('id')->primary();

			// Referenz auf User als UUID + nullable wegen nullOnDelete()
			$table->foreignUuid('created_by')->nullable()->constrained('users')->nullOnDelete();

			$table->string('title');
			$table->string('url');
			$table->string('favicon_url')->nullable();
			$table->string('target')->default('_blank');

			$table->timestamps();
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('apps');
	}
};
