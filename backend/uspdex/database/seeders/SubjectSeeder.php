<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subject = [
            'name' => "Introdução à Computação",
            'code' => "MAC0110",
            'syllabus' => "Introduzir conceitos básicos da Ciência da Computação por meio do estudo de uma linguagem algorítmica e de exercícios práticos. ",
            'lecture_credits' => 4,
            'work_credits' => 0
        ];
        Subject::create($subject);
        Subject::factory(150)->create();
    }
}
