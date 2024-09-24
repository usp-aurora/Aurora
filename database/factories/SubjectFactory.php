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
            'name' => $this->generateName(),
            'code' => $this->generateCustomCode(),
            'syllabus' => $this->faker->paragraph(),
            'lecture_credits' => $this->faker->numberBetween(2, 4),
            'work_credits' => $this->faker->numberBetween(0, 2)
        ];
    }
    
    /**
     * Generate a name with 3 to 8 words.
     *
     * @return string
     */
    private function generateName()
    {
        $wordCount = $this->faker->numberBetween(3, 8); // Randomly choose a number between 3 and 8
        $words = $this->faker->words($wordCount); // Generate the words
        
        return ucfirst(implode(' ', $words)); // Join the words into a sentence and capitalize the first letter
    }

    /**
     * Generate some subjects code.
     *
     * @return string
     */
    private function generateCustomCode()
    {
        $letters = "MAC";// strtoupper($this->faker->lexify('???'));
        $numbers = $this->faker->numerify('####'); // Generates 4 random numbers
        
        return $letters . $numbers;
    }
}
