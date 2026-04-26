<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FetchGeneralUnsplashImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $collectionIds = [];

        // Support alias 'collections' as CSV or array
        $collections = $this->input('collections');
        if (is_string($collections)) {
            $collectionIds = array_merge($collectionIds, array_map('trim', explode(',', $collections)));
        } elseif (is_array($collections)) {
            $collectionIds = array_merge($collectionIds, $collections);
        }

        // Support 'collection_ids' as CSV or array
        $ids = $this->input('collection_ids');
        if (is_string($ids)) {
            $collectionIds = array_merge($collectionIds, array_map('trim', explode(',', $ids)));
        } elseif (is_array($ids)) {
            $collectionIds = array_merge($collectionIds, $ids);
        }

        // Support single 'collection_id'
        $single = $this->input('collection_id');
        if (is_string($single) && $single !== '') {
            $collectionIds[] = trim($single);
        }

        // Normalize: unique, remove empties
        $collectionIds = array_values(array_unique(array_filter($collectionIds, fn ($v) => is_string($v) && $v !== '')));

        $this->merge(['collection_ids' => $collectionIds]);
    }

    public function rules(): array
    {
        return [
            'collection_id' => ['sometimes', 'string'],
            'collections' => ['sometimes'],
            'collection_ids' => ['sometimes', 'array'],
            'collection_ids.*' => ['string', 'distinct'],
        ];
    }
}
