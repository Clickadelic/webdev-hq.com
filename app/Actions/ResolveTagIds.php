<?php

namespace App\Actions;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ResolveTagIds
{
    /**
     * @param  array<int, string>  $values
     * @return array<int, int>
     */
    public function __invoke(array $values, User $user, ?int $teamId): array
    {
        return collect($values)->map(function (string $value) use ($user, $teamId): int {
            if (is_numeric($value)) {
                return (int) $value;
            }

            $existingTag = Tag::query()->where('name', $value)->first();
            if ($existingTag) {
                return $existingTag->id;
            }

            if ($teamId === null) {
                throw ValidationException::withMessages([
                    'team_id' => 'Select a team before creating tags.',
                ]);
            }

            return Tag::firstOrCreate(
                ['name' => $value],
                ['slug' => Str::slug($value), 'created_by' => $user->id, 'team_id' => $teamId]
            )->id;
        })->all();
    }
}
