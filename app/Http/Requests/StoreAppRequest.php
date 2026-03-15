<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],

            'url' => ['required', 'url', 'max:2048'],

            'target' => [
                'required',
                'string',
                Rule::in(['_self', '_blank'])
            ],

            'position' => ['nullable', 'integer', 'min:0'],
        ];
    }
}