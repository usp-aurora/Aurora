<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use \App\Models\Plan;
use \App\Models\Subject;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'subject_id' => $this->faker->unique->numberBetween(2, Subject::count()), // Must run SubjectSeeder first
            'semester' => $this->faker->numberBetween(1, 8)
        ];
    }
}
