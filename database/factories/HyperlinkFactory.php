<?php

namespace Database\Factories;

use App\Enums\Status;
use App\Models\Hyperlink;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Hyperlink>
 */
class HyperlinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'url' => fake()->url(),
            'description' => fake()->optional()->paragraph(),
            'status' => fake()->randomElement(Status::cases())->value,
            'created_by' => User::factory(),
        ];
    }
}
