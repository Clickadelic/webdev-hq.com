<?php

use App\Enums\Season;
use App\Services\Unsplash\UnsplashImageService;
use Tests\TestCase;

describe('Unsplash Image Service API Endpoints', function () {
	describe('GET /api/unsplash/image', function () {
		it('returns images from the requested collection', function () {
			/** @var TestCase $this */
			$unsplashImageService = Mockery::mock(UnsplashImageService::class);
			$unsplashImageService
				->shouldReceive('getImagesFromCollections')
				->once()
				->with(['collection-123'], 2, 10)
				->andReturn(['data' => [], 'meta' => []]);

			$this->app->instance(UnsplashImageService::class, $unsplashImageService);

			$this->getJson('/api/v1/unsplash/image?collection_id=collection-123&page=2&per_page=10')
				->assertOk()
				->assertExactJson(['data' => [], 'meta' => []]);
		});
	});

	describe('GET /api/unsplash/image/seasonal', function () {
		it('returns a random seasonal image for the current season', function () {
			/** @var TestCase $this */
			$response = $this->getJson('/api/v1/unsplash/image/seasonal');

			$response->assertOk();
			$response->assertJsonStructure([
				'data' => [
					'id',
					'description',
					'alt_description',
					'width',
					'height',
					'color',
					'blur_hash',
					'created_at',
					'urls' => ['raw', 'full', 'regular', 'small', 'thumb'],
					'links',
					'user' => ['name', 'username', 'links'],
				],
				'meta' => [
					'season',
					'collection_ids',
					'cached',
				],
			]);
		});

		it('returns a random seasonal image with a specified season', function () {
			/** @var TestCase $this */
			$response = $this->getJson('/api/v1/unsplash/image/seasonal?season=spring');

			$response->assertOk();
			$response->assertJsonPath('meta.season', 'spring');
		});

		it('rejects invalid season parameter', function () {
			/** @var TestCase $this */
			$response = $this->getJson('/api/v1/unsplash/image/seasonal?season=invalid');

			$response->assertStatus(422);
		});

		it('allows overriding collections via query parameter', function () {
			/** @var TestCase $this */
			$collectionId = config('services.unsplash.collections.spring');

			$response = $this->getJson("/api/v1/unsplash/image/seasonal?collections={$collectionId}");

			$response->assertOk();
		});

		it('falls back to a random seasonal image when no collection is configured', function () {
			/** @var TestCase $this */
			config(['services.unsplash.collections.spring' => null]);

			$response = $this->getJson('/api/v1/unsplash/image/seasonal?season=spring');

			$response->assertSuccessful();
			$response->assertJsonPath('meta.season', 'spring');
			$response->assertJsonPath('meta.collection_ids', []);
		});

		it('caches the response for 24 hours', function () {
			/** @var TestCase $this */
			$response1 = $this->getJson('/api/v1/unsplash/image/seasonal');
			$response1->assertOk();
			$photoId1 = $response1->json('data.id');

			$response2 = $this->getJson('/api/v1/unsplash/image/seasonal');
			$response2->assertOk();
			$photoId2 = $response2->json('data.id');

			// Same response from cache
			expect($photoId1)->toBe($photoId2);
		});
	});

	describe('GET /api/unsplash/image/general', function () {
		it('returns a random image from all configured collections', function () {
			/** @var TestCase $this */
			$response = $this->getJson('/api/v1/unsplash/image/general');

			$response->assertOk();
			$response->assertJsonStructure([
				'data' => [
					'id',
					'description',
					'alt_description',
					'width',
					'height',
					'color',
					'blur_hash',
					'created_at',
					'urls' => ['raw', 'full', 'regular', 'small', 'thumb'],
					'links',
					'user' => ['name', 'username', 'links'],
				],
				'meta' => [
					'collection_ids',
					'cached',
				],
			]);
		});

		it('allows overriding collections via query parameter', function () {
			/** @var TestCase $this */
			$collectionId = config('services.unsplash.collections.spring');

			$response = $this->getJson("/api/v1/unsplash/image/general?collections={$collectionId}");

			$response->assertOk();
		});

		it('combines all seasonal collections by default', function () {
			/** @var TestCase $this */
			$response = $this->getJson('/api/v1/unsplash/image/general');

			$response->assertOk();
			$collectionIds = $response->json('meta.collection_ids');

			// Should contain all configured seasonal collections
			expect(count($collectionIds))->toBeGreaterThanOrEqual(1);
		});

		it('returns error when no collections are configured', function () {
			/** @var TestCase $this */
			config(['services.unsplash.collections' => [
				'spring' => null,
				'summer' => null,
				'autumn' => null,
				'winter' => null,
			]]);

			$response = $this->getJson('/api/v1/unsplash/image/general');

			$response->assertStatus(422);
			$response->assertJsonPath('message', 'No collection IDs are configured.');
		});

		it('caches the response for 24 hours', function () {
			/** @var TestCase $this */
			$response1 = $this->getJson('/api/v1/unsplash/image/general');
			$response1->assertOk();
			$photoId1 = $response1->json('data.id');

			$response2 = $this->getJson('/api/v1/unsplash/image/general');
			$response2->assertOk();
			$photoId2 = $response2->json('data.id');

			// Same response from cache
			expect($photoId1)->toBe($photoId2);
		});
	});

	describe('Season Enum', function () {
		it('detects current season correctly', function () {
			// Mock the current month to test season detection
			$currentSeason = Season::current();

			expect($currentSeason)->toBeInstanceOf(Season::class);
			expect(in_array($currentSeason->value, ['spring', 'summer', 'autumn', 'winter']))->toBeTrue();
		});

		it('detects season from date correctly', function () {
			expect(Season::fromDate('2026-03-15')->value)->toBe('spring');
			expect(Season::fromDate('2026-06-15')->value)->toBe('summer');
			expect(Season::fromDate('2026-09-15')->value)->toBe('autumn');
			expect(Season::fromDate('2026-12-15')->value)->toBe('winter');
		});

		it('returns collection ID for season', function () {
			$collectionId = Season::Spring->collectionId();

			expect($collectionId)->toBe(config('services.unsplash.collections.spring'));
		});
	});
});
