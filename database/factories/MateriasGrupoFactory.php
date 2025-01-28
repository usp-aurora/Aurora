<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class MateriasGrupoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_grupo' => $this->faker->numberBetween(1, 3),
            'codigo_materia' => $this->generateCustomCode()
        ];
    }

    /**
     * Generate some subjects code.
     *
     * @return string
     */
    private function generateCustomCode()
    {
        $letters = "MAC";
        $numbers = $this->faker->numerify('####');
        
        return $letters . $numbers;
    }
    
}
