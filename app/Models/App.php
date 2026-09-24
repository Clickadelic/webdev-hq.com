<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class App extends Model
{
	use HasUuids;

	protected $keyType = 'string';
	public $incrementing = false;

	protected $fillable = [
		'title',
		'url',
		'favicon_url',
		'target',
		'position',
		'created_by',
		'team_id',
	];

	protected $casts = [
		'position' => 'integer',
	];

	public function creator(): BelongsTo
	{
		return $this->belongsTo(User::class, 'created_by');
	}

	public function team(): BelongsTo
	{
		return $this->belongsTo(Team::class);
	}
}
