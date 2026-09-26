# Unsplash Image API

All endpoints are public and use the `/api/v1/unsplash/image` prefix. They are rate-limited to 60 requests per 10 minutes.

Set `UNSPLASH_ACCESS_KEY` in the application environment. Optional Unsplash credentials and attribution settings are available in `config/services.php`.

## List Collection Photos

`GET /api/v1/unsplash/image`

Returns photos from one or more collections, with pagination metadata.

| Query parameter    | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `collection_id`    | One collection ID.                                     |
| `collection_ids[]` | One or more collection IDs as an array.                |
| `page`             | Page number; defaults to `1`. Must be at least `1`.    |
| `per_page`         | Photos per collection; defaults to `30`, maximum `30`. |

If no collection ID is supplied, the endpoint uses `UNSPLASH_COLLECTION_IDS`, a comma-separated list in the environment. It returns `422` if that list is empty.

```text
GET /api/v1/unsplash/image?collection_id=COLLECTION_ID&page=2&per_page=10
GET /api/v1/unsplash/image?collection_ids[]=COLLECTION_A&collection_ids[]=COLLECTION_B
```

The response has a `data` array of unique photos and a `meta` object containing `page`, `per_page`, and `collections`. Each collection metadata entry includes its `id`, `total`, `total_pages`, and pagination `links`. Each photo includes `id`, `collection_id`, descriptions, dimensions, color, blur hash, creation time, image `urls`, Unsplash `links`, and `user` details.

## Random General Photo

`GET /api/v1/unsplash/image/general`

Returns one random photo drawn from the configured seasonal collections. Override the collection selection with any of these query formats:

```text
GET /api/v1/unsplash/image/general?collection_id=COLLECTION_ID
GET /api/v1/unsplash/image/general?collections=COLLECTION_A,COLLECTION_B
GET /api/v1/unsplash/image/general?collection_ids[]=COLLECTION_A&collection_ids[]=COLLECTION_B
```

When no collection is specified, the endpoint combines the Spring, Summer, Autumn, and Winter collection IDs configured by `UNSPLASH_COLLECTION_SPRING_ID`, `UNSPLASH_COLLECTION_SUMMER_ID`, `UNSPLASH_COLLECTION_AUTUMN_ID`, and `UNSPLASH_COLLECTION_WINTER_ID`. If none are configured, it returns `422`.

The JSON response contains `data` (the photo) and `meta` (`collection_ids` and `cached`). Responses are cached for 24 hours per selected collection set.

## Random Seasonal Photo

`GET /api/v1/unsplash/image/seasonal`

Returns one random photo for the current Northern Hemisphere season. Use `season` to select a season explicitly (`spring`, `summer`, `autumn`, or `winter`). Collection overrides accept the same `collection_id`, `collections`, and `collection_ids` formats as the general endpoint.

```text
GET /api/v1/unsplash/image/seasonal?season=autumn
GET /api/v1/unsplash/image/seasonal?season=autumn&collection_id=COLLECTION_ID
```

Without a collection override, the endpoint uses the configured collection for the selected season. If that season has no collection configured, it falls back to a random Unsplash photo searched by the season name. The response contains `data` (the photo) and `meta` (`season`, `collection_ids`, and `cached`). Responses are cached for 24 hours per season and collection selection.

## Errors

- `422 Unprocessable Entity`: invalid query parameters, no collection configured/provided, or missing `UNSPLASH_ACCESS_KEY`.
- `502 Bad Gateway`: Unsplash request failure or another upstream image-fetch error.
