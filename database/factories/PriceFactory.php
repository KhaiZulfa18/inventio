<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Price>
 */
class PriceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'price' => fake()->numberBetween(5, 100) * 1000,
            'price_type' => fake()->randomElement([1, 2]),
            'status' => 1,
            'start_date' => Carbon::yesterday(),
            'created_by' => 1,
            'created_at' => time(),
        ];
    }
}
