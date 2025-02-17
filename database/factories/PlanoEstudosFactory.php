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
            'codigo_materia' => Materia::inRandomOrder()->first()->codigo_materia,
            'semestre' => $this->faker->numberBetween(1, 8)
        ];
    }
}