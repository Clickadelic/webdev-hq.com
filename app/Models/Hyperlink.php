<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Hyperlink extends Model
{
	use HasFactory, HasUuids;

	protected $fillable = [
		'title',
		'url',
		'favicon_url',
		'description',
		'category_id',
		'status',
		'created_by',
	];

	protected function casts(): array
	{
		return [
			'status' => Status::class,
		];
	}

	/*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

	public function category(): BelongsTo
	{
		return $this->belongsTo(Category::class);
	}

	public function author(): BelongsTo
	{
		return $this->belongsTo(User::class, 'created_by');
	}

	public function tags(): MorphToMany
	{
		return $this->morphToMany(Tag::class, 'taggable');
	}

	/*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

	public function scopePublished(Builder $query): Builder
	{
		return $query->where('status', Status::Published);
	}

	public function scopeForAppListing(Builder $query): Builder
	{
		return $query->published()
			->with(['category', 'author', 'tags'])
			->latest();
	}

	/*
    |--------------------------------------------------------------------------
    | Helpers & Static Methods
    |--------------------------------------------------------------------------
    */

	public static function appListing(int $perPage = 15)
	{
		return static::query()
			->forAppListing()
			->paginate($perPage);
	}
}
