<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAppRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only the creator may update the app
        return $this->app && (int) $this->app->created_by === (int) auth()->id();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],

            'url' => ['sometimes', 'url', 'max:2048'],

            'target' => [
                'sometimes',
                'string',
                Rule::in(['_self', '_blank'])
            ],

            'position' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
