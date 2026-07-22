<?php

use App\Enums\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		Schema::create('posts', function (Blueprint $table) {
			$table->uuid('id')->primary();

			// Relationen & Author (foreignUuid statt foreignId!)
			$table->foreignUuid('created_by')->constrained('users')->cascadeOnDelete();
			$table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();

			// Content
			$table->string('title');
			$table->string('subline')->nullable();
			$table->string('slug')->unique();
			$table->text('description')->nullable(); // Excerpt / Teaser
			$table->longText('content');             // Hauptinhalt
			$table->string('featured_image')->nullable();

			// Status & Timestamps
			$table->string('status')->default(Status::Draft->value);
			$table->timestamp('published_at')->nullable();

			// SEO
			$table->string('meta_title')->nullable();
			$table->text('meta_description')->nullable();

			$table->timestamps();
			$table->softDeletes();

			// Indizes für schnelle Abfragen im App-Listing
			$table->index(['status', 'published_at']);
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('posts');
	}
};
