<?php

use App\Enums\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		if (! Schema::hasTable('hyperlinks')) {
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

			return;
		}

		Schema::table('hyperlinks', function (Blueprint $table) {
			// if (! Schema::hasColumn('hyperlinks', 'created_by')) {
			// 	$table->foreignUuid('created_by')->nullable()->constrained('users')->nullOnDelete();
			// }

			if (! Schema::hasColumn('hyperlinks', 'category_id')) {
				$table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();
			}

			if (! Schema::hasColumn('hyperlinks', 'title')) {
				$table->string('title');
			}

			if (! Schema::hasColumn('hyperlinks', 'url')) {
				$table->string('url');
			}

			if (! Schema::hasColumn('hyperlinks', 'favicon_url')) {
				$table->string('favicon_url')->nullable();
			}

			if (! Schema::hasColumn('hyperlinks', 'description')) {
				$table->text('description')->nullable();
			}

			if (! Schema::hasColumn('hyperlinks', 'status')) {
				$table->string('status')->default(Status::Draft->value);
			}
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('hyperlinks');
	}
};
