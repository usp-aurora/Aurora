<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CompletionRequirement;

class CompletionRequirementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $requirements = [
            [
                'id' => 1,
                'type' => "Créditos",
                'completion_value' => "196",
                'group_id' => 1
            ],
            [
                'id' => 3,
                'type' => "Matérias",
                'completion_value' => "3",
                'group_id' => 3
            ],
            [
                'id' => 5,
                'type' => "Matérias",
                'completion_value' => "2",
                'group_id' => 5
            ],
            [
                'id' => 6,
                'type' => "Matérias",
                'completion_value' => "1",
                'group_id' => 6
            ],
            [
                'id' => 7,
                'type' => "Matérias",
                'completion_value' => "7",
                'group_id' => 7
            ],
            [
                'id' => 8,
                'type' => "Matérias",
                'completion_value' => "2",
                'group_id' => 8
            ],
            [
                'id' => 9,
                'type' => "Matérias",
                'completion_value' => "1",
                'group_id' => 9
            ],
            [
                'id' => 10,
                'type' => "Matérias",
                'completion_value' => "2",
                'group_id' => 10
            ],
            [
                'id' => 11,
                'type' => "Blocos",
                'completion_value' => "2",
                'group_id' => 11 
            ],
            [
                'id' => 12,
                'type' => "Matérias",
                'completion_value' => "1",
                'group_id' => 21 
            ],
            [
                'id' => 13,
                'type' => "Matérias",
                'completion_value' => "1",
                'group_id' => 22
            ],
            [
                'id' => 14,
                'type' => "Matérias",
                'completion_value' => "1",
                'group_id' => 23 
            ],
            [
                'id' => 15,
                'type' => "Matérias",
                'completion_value' => "1",
                'group_id' => 24 
            ],
            [
                'id' => 16,
                'type' => "Matérias",
                'completion_value' => "1",
                'group_id' => 25 
            ],
            [
                'id' => 17,
                'type' => "Matérias",
                'completion_value' => "7",
                'group_id' => 11
            ],
        ];

        foreach ($requirements as $requirement) {
            CompletionRequirement::create($requirement);
        }
        
        //CriteriosCompletude::factory(15)->create();
    }
}
 