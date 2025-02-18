<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(rand(3, 8)),
            'subject_code' => $this->generateCustomCode(),
            'syllabus' => $this->faker->paragraph(),
            'class_credits' => $this->faker->numberBetween(2, 4),
            'job_credits' => $this->faker->numberBetween(0, 2)
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