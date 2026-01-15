<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Enums\AppStatus;

class App extends Model
{
    use HasUuids, SoftDeletes;
    
    protected $keyType = 'string';
    public $incrementing = false;
    
    protected $casts = [
        'status' => AppStatus::class,
    ];

    protected $fillable = [
        'title',
        'url',
        'target',
        'description',
        'created_by',
        'status',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
