<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use \App\Models\PlanoEstudos;
use \App\Models\Materia;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanoEstudosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_usuario' => 1,
            'id_materia' => $this->faker->unique->numberBetween(2, Materia::count()), // Must run SubjectSeeder first
            'semestre' => $this->faker->numberBetween(1, 8)
        ];
    }
}
