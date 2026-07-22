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

			$table->string('title');
			$table->string('url');
			$table->string('favicon_url', 2048)->nullable();
			$table->text('description')->nullable();

			$table->foreignId('category_id')
				->nullable()
				->constrained()
				->nullOnDelete();

			$table->string('status')
				->default(Status::Draft->value)
				->index();

			$table->foreignId('created_by')
				->nullable()
				->constrained('users')
				->nullOnDelete();

			$table->timestamps();
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('hyperlinks');
	}
};
