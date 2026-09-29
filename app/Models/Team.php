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
		'image_path',
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

	/**
	 * Members list with the owner included and flagged, for settings/admin UIs.
	 *
	 * @return array<int, array{id: int|string, name: string, email: string, is_owner: bool}>
	 */
	public function membersWithOwner(): array
	{
		$this->loadMissing(['owner:id,name,email', 'members:id,name,email']);

		$members = $this->members->map(fn(User $member): array => [
			'id' => $member->id,
			'name' => $member->name,
			'email' => $member->email,
			'is_owner' => $member->is($this->owner),
		]);

		if (! $this->members->contains(fn(User $member): bool => $member->is($this->owner))) {
			$members->prepend([
				'id' => $this->owner->id,
				'name' => $this->owner->name,
				'email' => $this->owner->email,
				'is_owner' => true,
			]);
		}

		return $members->values()->all();
	}
}
