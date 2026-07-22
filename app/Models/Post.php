<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
	/** @use HasFactory<\Database\Factories\PostFactory> */
	use HasFactory, HasUuids, SoftDeletes;

	protected $fillable = [
		'title',
		'subline',
		'slug',
		'description',
		'content',
		'featured_image',
		'category_id',
		'status',
		'published_at',
		'created_by',
		'meta_title',
		'meta_description',
	];

	protected function casts(): array
	{
		return [
			'status' => Status::class,
			'published_at' => 'datetime',
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
		return $query->where('status', Status::Published)
			->where(function (Builder $q) {
				$q->whereNull('published_at')
					->orWhere('published_at', '<=', now());
			});
	}

	public function scopeForAppListing(Builder $query): Builder
	{
		return $query->published()
			->with(['category', 'author', 'tags'])
			->latest('published_at');
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
