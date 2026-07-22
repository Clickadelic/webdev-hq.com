<?php

namespace App\Http\Requests;

use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;

class StorePostRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	protected function prepareForValidation(): void
	{
		// Falls kein Slug mitgeschickt wurde, aus dem Titel generieren
		if (! $this->filled('slug') && $this->filled('title')) {
			$this->merge([
				'slug' => Str::slug($this->input('title')),
			]);
		}
	}

	public function rules(): array
	{
		return [
			'title' => ['required', 'string', 'max:255'],
			'subline' => ['nullable', 'string', 'max:255'],
			'slug' => ['required', 'string', 'max:255', 'unique:posts,slug'],
			'description' => ['nullable', 'string'],
			'content' => ['required', 'string'],
			'featured_image' => ['nullable', 'string', 'max:2048'],
			'category_id' => ['nullable', 'uuid', 'exists:categories,id'],
			'status' => ['required', new Enum(Status::class)],
			'published_at' => ['nullable', 'date'],
			'meta_title' => ['nullable', 'string', 'max:255'],
			'meta_description' => ['nullable', 'string'],
			'tag_ids' => ['array'],
			'tag_ids.*' => ['uuid', 'exists:tags,id'],
		];
	}
}
