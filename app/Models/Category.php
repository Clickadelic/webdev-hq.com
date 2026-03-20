<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'slug'];

    /**
     * Get all hyperlinks in this category.
     */
    public function hyperlinks()
    {
        return $this->hasMany(Hyperlink::class);
    }

    /**
     * Get all posts in this category (future use).
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
