<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
	use HasFactory;

	protected $fillable = [
		'name',
		'slug',
		'owner_id',
	];

	public function owner(): BelongsTo
	{
		return $this->belongsTo(User::class, 'owner_id');
	}

	public function members(): BelongsToMany
	{
		return $this->belongsToMany(User::class)->withTimestamps();
	}

	public function apps(): HasMany
	{
		return $this->hasMany(App::class);
	}

	public function categories(): HasMany
	{
		return $this->hasMany(Category::class);
	}

	public function tags(): HasMany
	{
		return $this->hasMany(Tag::class);
	}

	public function hyperlinks(): HasMany
	{
		return $this->hasMany(Hyperlink::class);
	}

	public function posts(): HasMany
	{
		return $this->hasMany(Post::class);
	}
}
