<?php

use App\Enums\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		if (!Schema::hasTable('hyperlinks')) {
			// Create the table if it doesn't exist
			Schema::create('hyperlinks', function (Blueprint $table) {
				$table->uuid('id')->primary();

				// WICHTIG: foreignUuid statt foreignId!
				$table->foreignUuid('created_by')->nullable()->constrained('users')->nullOnDelete();
				$table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();

				$table->string('title');
				$table->string('url');
				$table->string('favicon_url')->nullable();
				$table->text('description')->nullable();
				$table->string('status')->default(Status::Draft->value);

				$table->timestamps();
			});
		} else {
			// Table exists, check for columns before adding
			if (!Schema::hasColumn('hyperlinks', 'created_by')) {
				Schema::table('hyperlinks', function (Blueprint $table) {
					$table->foreignUuid('created_by')->nullable()->constrained('users')->nullOnDelete();
				});
			}
			if (!Schema::hasColumn('hyperlinks', 'category_id')) {
				Schema::table('hyperlinks', function (Blueprint $table) {
					$table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();
				});
			}
			// Add other columns check here if needed
		}
	}

	public function down(): void
	{
		Schema::dropIfExists('hyperlinks');
	}
};
