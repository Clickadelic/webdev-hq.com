<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
	use HasUuids;

	protected $keyType = 'string';

	public $incrementing = false;

	protected $fillable = ['name', 'slug', 'team_id', 'created_by'];

	public function creator(): BelongsTo
	{
		return $this->belongsTo(User::class, 'created_by');
	}

	public function team(): BelongsTo
	{
		return $this->belongsTo(Team::class);
	}

	/**
	 * Get all hyperlinks in this category.
	 */
	public function hyperlinks()
	{
		return $this->hasMany(Hyperlink::class);
	}

	// /**
	//  * Get all posts in this category (future use).
	//  */
	// public function posts()
	// {
	//     return $this->hasMany(Post::class);
	// }
}
