<?php

namespace App\Http\Requests;

use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UpdatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        $post = $this->route('post');
        $user = $this->user();
        $teamId = $this->input('team_id');
        $teamUnchanged = ($teamId === null && $post->team_id === null)
            || (is_scalar($teamId) && $post->team_id !== null && (string) $teamId === (string) $post->team_id);

        return $user->can('update', $post)
            && (! $this->exists('team_id')
                || $teamUnchanged
                || $user->can('assignTeam', $post));
    }

    protected function prepareForValidation(): void
    {
        if (! $this->filled('slug') && $this->filled('title')) {
            $this->merge([
                'slug' => Str::slug($this->input('title')),
            ]);
        }
    }

    public function rules(): array
    {
        // Holt das aktuelle Post-Model aus der Route
        $postId = $this->route('post')?->id ?? $this->route('post');

        return [
            'title' => ['required', 'string', 'max:255'],
            'subline' => ['nullable', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('posts', 'slug')->ignore($postId),
            ],
            'description' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'featured_image_upload' => ['nullable', Rule::prohibitedIf($this->boolean('remove_featured_image')), 'image', 'mimes:jpeg,png,webp', 'extensions:jpg,jpeg,png,webp', 'max:5120'],
            'remove_featured_image' => ['nullable', 'boolean'],
            'category_id' => ['nullable', 'uuid', 'exists:categories,id'],
            'status' => ['required', new Enum(Status::class)],
            'published_at' => ['nullable', 'date'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'tag_ids' => ['nullable', 'array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
            'team_id' => ['nullable', 'integer', Rule::in([
                ...$this->user()->teams()->pluck('teams.id')->all(),
                ...($this->route('post')->team_id === null ? [] : [$this->route('post')->team_id]),
            ])],
        ];
    }
}
