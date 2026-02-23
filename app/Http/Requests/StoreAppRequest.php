<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "id" => ["required", "integer"],
            "title" => ["required", "string"],
            "url" => ["required", "url"],
            "target" => ["required", "string"],
            "description" => ["nullable", "string"],
            "created_by" => ["required", "string"],
            "status" => ["required", "string"],
        ];
    }
}