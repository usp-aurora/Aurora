<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class GrupoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => $this->$faker->sentence(rand(3, 8)),
            'descricao' => $this->faker->paragraph(),
            //'id_grupo_pai' => $this->faker->numberBetween(1, 20)
            'id_grupo_pai' => null
        ];
    }
}