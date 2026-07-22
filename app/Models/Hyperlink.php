<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hyperlink extends Model
{
	use HasFactory, HasUuids;

	protected $fillable = [
		'title',
		'url',
		'description',
		'category_id',
		'status',
	];

	protected function casts(): array
	{
		return [
			'status' => Status::class,
		];
	}

	public function category(): BelongsTo
	{
		return $this->belongsTo(Category::class);
	}
}
