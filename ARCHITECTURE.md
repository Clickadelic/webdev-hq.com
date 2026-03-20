# WebDev HQ - Architecture Documentation

## Project Overview
Central headquarters for developers with resources (hyperlinks), quick-access apps, and posts (future).

---

## Data Models

### 1. Apps (Quick Links)
**Purpose:** Simple quick-access links like Chrome new tab  
**Characteristics:**
- ❌ No categories
- ❌ No tags
- ✅ Sortable (position field)
- ✅ UUID-based IDs

**Fields:**
- `id` (UUID)
- `title`
- `url`
- `target` (default: `_self`)
- `position` (for ordering)
- `created_by` (nullable FK to users)
- `timestamps`

**Relationships:**
- `creator()` → belongsTo User

---

### 2. Hyperlinks (Resources)
**Purpose:** Developer resources with categorization and tagging  
**Characteristics:**
- ✅ Categories (direct relationship)
- ✅ Tags (polymorphic)
- ✅ Status (draft/published)
- ✅ Author tracking

**Fields:**
- `id`
- `title`
- `url`
- `description` (nullable)
- `category_id` (nullable FK)
- `status` (draft/published)
- `created_by` (nullable FK to users)
- `timestamps`

**Relationships:**
- `category()` → belongsTo Category
- `author()` → belongsTo User
- `tags()` → morphToMany Tag

**Scopes:**
- `published()` - Only show published hyperlinks

---

### 3. Posts (Future)
**Purpose:** Blog posts, tutorials, documentation  
**Characteristics:**
- ✅ Categories (direct relationship)
- ✅ Tags (polymorphic)
- ✅ Status (draft/published)
- ✅ Author tracking

**Planned Structure:**
- Categories via `category_id`
- Tags via polymorphic `taggables` table
- Same status system as Hyperlinks

---

### 4. Categories
**Purpose:** Organize hyperlinks and posts  
**Fields:**
- `id`
- `name`
- `slug`
- `timestamps`

**Relationships:**
- `hyperlinks()` → hasMany Hyperlink
- `posts()` → hasMany Post (future)

**Note:** Apps do NOT use categories

---

### 5. Tags
**Purpose:** Polymorphic tagging for hyperlinks and posts  
**Fields:**
- `id`
- `name`
- `slug`
- `timestamps`

**Relationships:**
- `hyperlinks()` → morphedByMany Hyperlink
- `posts()` → morphedByMany Post (future)

**Pivot Table:** `taggables`
- `id`
- `tag_id`
- `taggable_id`
- `taggable_type`

**Note:** Apps do NOT use tags

---

## Architecture Decisions

### Why Direct Category Relationship?
- Simpler queries for most use cases
- Each resource belongs to ONE category
- Better performance than polymorphic

### Why Polymorphic Tags?
- Resources can have MULTIPLE tags
- Shared tag vocabulary across content types
- Flexible querying

### Why Apps Are Separate?
- Different use case (quick access vs resources)
- No need for organization (sorted by position)
- Cleaner mental model

---

## Database Schema Summary

```
users
├── apps (via created_by)
├── hyperlinks (via created_by)
└── posts (via created_by, future)

categories
├── hyperlinks (via category_id)
└── posts (via category_id, future)

tags
├── hyperlinks (via taggables polymorphic)
└── posts (via taggables polymorphic, future)

apps (standalone, position-sorted)
```

---

## Migration Steps Completed

1. ✅ Removed unused `categorizables` polymorphic table
2. ✅ Added `created_by` to hyperlinks
3. ✅ Completed Tag model with relationships
4. ✅ Added future Posts relationships to Category and Tag models
5. ✅ Verified App model has no category/tag references

---

## Next Steps

### Immediate
- Run migration: `php artisan migrate`
- Test hyperlink creation with author tracking

### Future
- Create Post model (similar to Hyperlink)
- Build category management UI
- Build tag management UI
- Add search/filtering by category and tags

---

## Status Enum
```php
enum Status: string {
    case Draft = 'draft';
    case Published = 'published';
}
```

Used by: Hyperlinks, Posts (future)  
Not used by: Apps
