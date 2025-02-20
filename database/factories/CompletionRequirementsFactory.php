<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class CompletionRequirementsFactory extends Factory
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
            'completion_value' => $this->faker->word(1),
            'group_id' => $this->faker->numberBetween(1, 3)
            //'id_grupo' => 1
        ];
    }   
}