<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hyperlink extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'url',
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
}
