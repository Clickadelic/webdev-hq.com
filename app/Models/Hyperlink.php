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
    ];

    protected $casts = [
        'category_id' => 'integer',
    ];

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
