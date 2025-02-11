<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class CriteriosCompletudeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tipo' => $this->faker->word(1),
            'valor_completude' => $this->faker->word(1),
            'id_grupo' => $this->faker->numberBetween(1, 3)
            //'id_grupo' => 1
        ];
    }   
}