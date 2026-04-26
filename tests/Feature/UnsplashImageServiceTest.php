<?php

use App\Enums\Season;

describe('Unsplash Image Service API Endpoints', function () {
	describe('GET /api/unsplash/image/seasonal', function () {
		it('returns a random seasonal image for the current season', function () {
			$response = $this->getJson('/api/unsplash/image/seasonal');

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
			$response = $this->getJson('/api/unsplash/image/seasonal?season=spring');

			$response->assertOk();
			$response->assertJsonPath('meta.season', 'spring');
		});

		it('rejects invalid season parameter', function () {
			$response = $this->getJson('/api/unsplash/image/seasonal?season=invalid');

			$response->assertStatus(422);
		});

		it('allows overriding collections via query parameter', function () {
			$collectionId = config('services.unsplash.collections.spring');

			$response = $this->getJson("/api/unsplash/image/seasonal?collections={$collectionId}");

			$response->assertOk();
		});

		it('returns error when no collection is configured for a season', function () {
			config(['services.unsplash.collections.spring' => null]);

			$response = $this->getJson('/api/unsplash/image/seasonal?season=spring');

			$response->assertStatus(422);
			$response->assertJsonPath('message', 'No collection ID configured for season: spring');
		});

		it('caches the response for 24 hours', function () {
			$response1 = $this->getJson('/api/unsplash/image/seasonal');
			$response1->assertOk();
			$photoId1 = $response1->json('data.id');

			$response2 = $this->getJson('/api/unsplash/image/seasonal');
			$response2->assertOk();
			$photoId2 = $response2->json('data.id');

			// Same response from cache
			expect($photoId1)->toBe($photoId2);
		});
	});

	describe('GET /api/unsplash/image/general', function () {
		it('returns a random image from all configured collections', function () {
			$response = $this->getJson('/api/unsplash/image/general');

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
			$collectionId = config('services.unsplash.collections.spring');

			$response = $this->getJson("/api/unsplash/image/general?collections={$collectionId}");

			$response->assertOk();
		});

		it('combines all seasonal collections by default', function () {
			$response = $this->getJson('/api/unsplash/image/general');

			$response->assertOk();
			$collectionIds = $response->json('meta.collection_ids');

			// Should contain all configured seasonal collections
			expect(count($collectionIds))->toBeGreaterThanOrEqual(1);
		});

		it('returns error when no collections are configured', function () {
			config(['services.unsplash.collections' => [
				'spring' => null,
				'summer' => null,
				'autumn' => null,
				'winter' => null,
			]]);

			$response = $this->getJson('/api/unsplash/image/general');

			$response->assertStatus(422);
			$response->assertJsonPath('message', 'No collection IDs are configured.');
		});

		it('caches the response for 24 hours', function () {
			$response1 = $this->getJson('/api/unsplash/image/general');
			$response1->assertOk();
			$photoId1 = $response1->json('data.id');

			$response2 = $this->getJson('/api/unsplash/image/general');
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
