<?php

namespace App\Http\Requests;

use App\Enums\Season;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FetchSeasonalUnsplashImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'season' => ['nullable', 'string', Rule::enum(Season::class)],
            'collections' => ['nullable', 'string'],
        ];
    }
}
