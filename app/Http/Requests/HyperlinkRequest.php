<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rules\Enum;
use App\Enums\Status;
use Illuminate\Validation\Rules\RequiredIf;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class HyperlinkRequest extends FormRequest
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
	 * @return array<string, ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'title' => ['required', 'string', 'max:255'],
			'url' => ['required', 'url', 'max:255'],
			'favicon_url' => ['nullable', 'url', 'max:2048'],
			'description' => ['nullable', 'string'],
			'category' => ['nullable', 'string', 'max:255'], // Can be numeric ID or category name
			'status' => ['required', Rule::enum(Status::class)],
			'tags' => ['nullable', 'array'],
			'tags.*' => ['required', 'string', 'max:255'],
		];
	}
}
