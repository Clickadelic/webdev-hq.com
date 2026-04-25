<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FetchGeneralUnsplashImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'collections' => ['nullable', 'string'],
        ];
    }
}
