<?php

namespace App\Http\Requests;

use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreHyperlinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'url' => ['required', 'url', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:255'], // Can be numeric ID or category name
            'status' => ['required', Rule::enum(Status::class)],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['required', 'string', 'max:255'],
        ];
    }
}
