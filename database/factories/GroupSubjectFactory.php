<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class GroupSubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'group_id' => $this->faker->numberBetween(1, 3),
            'subject_code' => $this->generateCustomCode()
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
