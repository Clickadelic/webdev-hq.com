<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tag extends Model
{
	use HasFactory;

	protected $fillable = [
		'name',
		'slug',
		'team_id',
		'created_by',
	];

	public function creator(): BelongsTo
	{
		return $this->belongsTo(User::class, 'created_by');
	}

	public function team(): BelongsTo
	{
		return $this->belongsTo(Team::class);
	}

	/**
	 * Get all hyperlinks that have this tag.
	 */
	public function hyperlinks()
	{
		return $this->morphedByMany(Hyperlink::class, 'taggable');
	}

	/**
	 * Get all posts that have this tag (future use).
	 */
	public function posts()
	{
		return $this->morphedByMany(Post::class, 'taggable');
	}
}
