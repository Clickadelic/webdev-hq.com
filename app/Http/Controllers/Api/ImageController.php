<?php

namespace App\Http\Controllers\Api;

use App\Enums\Season;
use App\Http\Controllers\Controller;
use App\Http\Requests\FetchGeneralUnsplashImageRequest;
use App\Http\Requests\FetchSeasonalUnsplashImageRequest;
use App\Http\Requests\FetchUnsplashImagesRequest;
use App\Services\Unsplash\UnsplashImageService;
use Illuminate\Http\JsonResponse;
use InvalidArgumentException;
use Unsplash\Exception as UnsplashException;

class ImageController extends Controller
{
    public function index(FetchUnsplashImagesRequest $request, UnsplashImageService $unsplashImageService): JsonResponse
    {
        $validated = $request->validated();
        $collectionIds = $validated['collection_ids'] ?? [];

        if (isset($validated['collection_id'])) {
            $collectionIds[] = $validated['collection_id'];
        }

        if ($collectionIds === []) {
            $collectionIds = config('services.unsplash.collection_ids', []);
        }
        $page = $validated['page'] ?? 1;
        $perPage = $validated['per_page'] ?? 30;

        if ($collectionIds === []) {
            return response()->json([
                'message' => 'No Unsplash collection IDs were provided.',
            ], 422);
        }

        try {
            $images = $unsplashImageService->getImagesFromCollections($collectionIds, $page, $perPage);

            return response()->json($images);
        } catch (InvalidArgumentException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        } catch (UnsplashException $exception) {
            return response()->json([
                'message' => 'Unsplash request failed.',
                'errors' => $exception->getArray(),
            ], 502);
        } catch (\Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Unable to fetch images from Unsplash.',
            ], 502);
        }
    }

    /**
     * Get a random seasonal image based on the current date or specified season.
     * Supports 24-hour caching.
     */
    public function seasonal(FetchSeasonalUnsplashImageRequest $request, UnsplashImageService $unsplashImageService): JsonResponse
    {
        try {
            $validated = $request->validated();

            // Determine the season (use provided season or detect current)
            $season = blank($validated['season'] ?? null)
                ? Season::current()
                : Season::from($validated['season']);

            // Get collection IDs from request or fall back to season default
            $collectionIds = $validated['collection_ids'] ?? [];

            if (blank($collectionIds)) {
                $collectionId = $season->collectionId();

                if (blank($collectionId)) {
                    return response()->json([
                        'message' => "No collection ID configured for season: {$season->value}",
                    ], 422);
                }

                $collectionIds = [$collectionId];
            }

            // Cache key based on season and collection IDs
            $cacheKey = "unsplash:seasonal:{$season->value}:".md5(implode(',', $collectionIds));
            $ttlSeconds = 24 * 60 * 60; // 24 hours

            $image = $unsplashImageService->getRandomPhotoFromCollections(
                $collectionIds,
                [],
                $cacheKey,
                $ttlSeconds
            );

            return response()->json([
                'data' => $image,
                'meta' => [
                    'season' => $season->value,
                    'collection_ids' => $collectionIds,
                    'cached' => true,
                ],
            ]);
        } catch (InvalidArgumentException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        } catch (UnsplashException $exception) {
            return response()->json([
                'message' => 'Unsplash request failed.',
                'errors' => $exception->getArray(),
            ], 502);
        } catch (\Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Unable to fetch seasonal image from Unsplash.',
            ], 502);
        }
    }

    /**
     * Get a random image from all configured collections.
     * Supports 24-hour caching.
     */
    public function general(FetchGeneralUnsplashImageRequest $request, UnsplashImageService $unsplashImageService): JsonResponse
    {
        try {
            $validated = $request->validated();

            // Get collection IDs from request or use all configured collections
            $collectionIds = $validated['collection_ids'] ?? [];

            if (blank($collectionIds)) {
                // Combine all seasonal collections
                $collectionIds = array_filter([
                    Season::Spring->collectionId(),
                    Season::Summer->collectionId(),
                    Season::Autumn->collectionId(),
                    Season::Winter->collectionId(),
                ]);

                if (blank($collectionIds)) {
                    return response()->json([
                        'message' => 'No collection IDs are configured.',
                    ], 422);
                }

                $collectionIds = array_values($collectionIds);
            }

            // Cache key for general images
            $cacheKey = 'unsplash:general:'.md5(implode(',', $collectionIds));
            $ttlSeconds = 24 * 60 * 60; // 24 hours

            $image = $unsplashImageService->getRandomPhotoFromCollections(
                $collectionIds,
                [],
                $cacheKey,
                $ttlSeconds
            );

            return response()->json([
                'data' => $image,
                'meta' => [
                    'collection_ids' => $collectionIds,
                    'cached' => true,
                ],
            ]);
        } catch (InvalidArgumentException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        } catch (UnsplashException $exception) {
            return response()->json([
                'message' => 'Unsplash request failed.',
                'errors' => $exception->getArray(),
            ], 502);
        } catch (\Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Unable to fetch general image from Unsplash.',
            ], 502);
        }
    }

}
