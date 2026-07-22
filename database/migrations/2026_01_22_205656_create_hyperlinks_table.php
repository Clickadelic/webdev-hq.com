<?php

use App\Enums\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
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
	}

	public function down(): void
	{
		Schema::dropIfExists('hyperlinks');
	}
};
