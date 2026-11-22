<?php

namespace App\Models;

use App\Enums\Status;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model implements HasMedia
{
    /** @use HasFactory<PostFactory> */
    use HasFactory, HasUuids, InteractsWithMedia, SoftDeletes;

    protected $hidden = ['media'];

    protected $fillable = [
        'title',
        'subline',
        'slug',
        'description',
        'content',
        'featured_image',
        'category_id',
        'status',
        'published_at',
        'created_by',
        'team_id',
        'meta_title',
        'meta_description',
    ];

    protected function casts(): array
    {
        return [
            'status' => Status::class,
            'published_at' => 'datetime',
        ];
    }

    protected function featuredImage(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value): ?string => $this->getFirstMedia('featured-image')?->getUrl() ?? $value,
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', Status::Published)
            ->where(function (Builder $q) {
                $q->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            });
    }

    public function scopeForAppListing(Builder $query): Builder
    {
        return $query->published()
            ->with(['category', 'author', 'tags'])
            ->latest('published_at');
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers & Static Methods
    |--------------------------------------------------------------------------
    */

    public static function appListing(int $perPage = 15)
    {
        return static::query()
            ->forAppListing()
            ->paginate($perPage);
    }
}
