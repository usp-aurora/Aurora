<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class MateriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->sentence(rand(3, 8)),
            'codigo_materia' => $this->generateCustomCode(),
            'ementa' => $this->faker->paragraph(),
            'creditos_aula' => $this->faker->numberBetween(2, 4),
            'creditos_trabalho' => $this->faker->numberBetween(0, 2)
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