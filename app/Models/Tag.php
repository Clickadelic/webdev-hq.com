<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

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
