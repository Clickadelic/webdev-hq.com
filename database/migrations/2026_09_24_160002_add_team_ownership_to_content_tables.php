<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		foreach (['apps', 'categories', 'tags', 'hyperlinks', 'posts'] as $tableName) {
			Schema::table($tableName, function (Blueprint $table) {
				$table->foreignId('team_id')->nullable()->after('id')->constrained('teams')->nullOnDelete();
			});
		}

		foreach (['categories', 'tags'] as $tableName) {
			Schema::table($tableName, function (Blueprint $table) {
				$table->foreignUuid('created_by')->nullable()->after('team_id')->constrained('users')->nullOnDelete();
			});
		}
	}

	public function down(): void
	{
		foreach (['apps', 'categories', 'tags', 'hyperlinks', 'posts'] as $tableName) {
			Schema::table($tableName, function (Blueprint $table) {
				$table->dropForeign(['team_id']);
				$table->dropColumn('team_id');
			});
		}

		foreach (['categories', 'tags'] as $tableName) {
			Schema::table($tableName, function (Blueprint $table) {
				$table->dropForeign(['created_by']);
				$table->dropColumn('created_by');
			});
		}
	}
};
