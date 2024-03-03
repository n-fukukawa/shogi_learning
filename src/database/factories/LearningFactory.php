<?php

namespace Database\Factories;

use App\Models\LearningCategory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Learning>
 */
class LearningFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => LearningCategory::inRandomOrder()->first()->id,
            'title' => fake()->realText(20),
            'comment' => fake()->realText(100),
            'learning_time' => random_int(10, 300),
            'learning_at' => Carbon::now(),
        ];
    }
}
