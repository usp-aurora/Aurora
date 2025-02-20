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
<<<<<<< HEAD:database/factories/PlanFactory.php
            'user_id' => 1,
            'subject_code' => Subject::inRandomOrder()->first()->code,
            'semester' => $this->faker->numberBetween(1, 8)
=======
            'id_usuario' => 1,
            'codigo_materia' => Materia::inRandomOrder()->first()->codigo_materia,
            'semestre' => $this->faker->numberBetween(1, 8)
>>>>>>> c60579ab04d2b22074311f1020975e3bb505b303:database/factories/PlanoEstudosFactory.php
        ];
    }
}