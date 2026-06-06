<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hyperlink extends Model
{
    use HasFactory;

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
    --------------------------------------------------------------------------
     Relationships
    --------------------------------------------------------------------------
    */

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopePublished($query)
    {
        return $query->where('status', Status::Published->value);
    }

    public function scopeForAppListing($query)
    {
        return $query->latest();
    }

    public static function appListing(int $perPage = 15)
    {
        return static::query()
            ->forAppListing()
            ->paginate($perPage);
    }
}
