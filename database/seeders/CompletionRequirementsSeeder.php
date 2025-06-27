<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CompletionRequirement;
use App\Enums\CompletionType;

class CompletionRequirementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $requirements = [
            // Trilha de IA
            [
                'type' => CompletionType::SUBGROUPS,
                'completion_value' => "3",
                'group_id' => 2
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "3",
                'group_id' => 3
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "2",
                'group_id' => 5
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "1",
                'group_id' => 6
            ],
            // Trilha de Sistemas
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "7",
                'group_id' => 7
            ],
            [
                'type' => CompletionType::SUBGROUPS,
                'completion_value' => "3",
                'group_id' => 7
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "2",
                'group_id' => 8
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "1",
                'group_id' => 9
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "2",
                'group_id' => 10
            ],
            // Trilha de teoria
            [
                'type' => CompletionType::SUBGROUPS,
                'completion_value' => "2",
                'group_id' => 11 
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "7",
                'group_id' => 11 
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "2",
                'group_id' => 12 
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "3",
                'group_id' => 14 
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "2",
                'group_id' => 16
            ],
            // Trilha de dados
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "7",
                'group_id' => 18
            ],
            [
                'type' => CompletionType::SUBGROUPS,
                'completion_value' => "5",
                'group_id' => 19
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "1",
                'group_id' => 20
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "1",
                'group_id' => 21 
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "1",
                'group_id' => 22
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "1",
                'group_id' => 23 
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "1",
                'group_id' => 24 
            ],
            [
                'type' => CompletionType::SUBJECTS,
                'completion_value' => "1",
                'group_id' => 25 
            ],
            // Obrigatórias
            [
                'type' => CompletionType::CREDITS,
                'completion_value' => "108",
                'group_id' => 28
            ],
            // Optativas
            [
                'type' => CompletionType::CREDITS,
                'completion_value' => "52",
                'group_id' => 29
            ],
            // Optativas de estatística
            [
                'type' => CompletionType::CREDITS,
                'completion_value' => "4",
                'group_id' => 30
            ],
            // Optativas de humanidades
            [
                'type' => CompletionType::CREDITS,
                'completion_value' => "3",
                'group_id' => 31
            ],
            // Optativas de ciências
            [
                'type' => CompletionType::CREDITS,
                'completion_value' => "4",
                'group_id' => 32
            ],
            // Livres
            [
                'type' => CompletionType::CREDITS,
                'completion_value' => "24",
                'group_id' => 33
            ],
        ];

        foreach ($requirements as $requirement) {
            CompletionRequirement::create($requirement);
        }
    }
}
 