<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		Schema::create('images', function (Blueprint $table) {
			$table->uuid('id')->primary();

			// Optional: Falls Bilder einem User gehören oder polymorph verknüpft sind
			// $table->foreignUuid('user_id')->nullable()->constrained()->nullOnDelete();
			// $table->uuidMorphs('imageable');

			$table->string('path');
			$table->string('alt_text')->nullable();

			$table->timestamps();
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('images');
	}
};
