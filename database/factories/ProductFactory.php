<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'weight' => fake()->randomFloat(2, 0.5, 30),
            'unit' => fake()->randomElement(['dus', 'karung', 'sak', 'pcs']),
            'created_by' => 1,
            'created_at' => time(),
        ];
    }
}
