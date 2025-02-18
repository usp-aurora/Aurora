<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class CompletenessCriteriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => $this->faker->word(1),
            'completeness_value' => $this->faker->word(1),
            'id_group' => $this->faker->numberBetween(1, 3)
            //'group_id' => 1
        ];
    }   
}