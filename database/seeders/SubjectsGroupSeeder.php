<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SubjectsGroup;

class SubjectsGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $subjectsGroup = [
            [
                'id' => 1, 
                'id_group' => 3,
                'subject_code' => "MAC0425"
            ],
            [
                'id' => 2, 
                'id_group' => 4,
                'subject_code' => "MAC0318"
            ],
            [
                'id' => 3, 
                'id_group' => 4,
                'subject_code' => "MAC0444"
            ],
            [
                'id' => 4, 
                'id_group' => 4,
                'subject_code' => "MAC0459"
            ],
            [
                'id' => 5, 
                'id_group' => 4,
                'subject_code' => "MAC0460"
            ],
            [
                'id' => 6, 
                'id_group' => 5,
                'subject_code' => "MAC0218"
            ],
            [
                'id' => 7, 
                'id_group' => 5,
                'subject_code' => "MAC0332"
            ],
            [
                'id' => 8, 
                'id_group' => 5,
                'subject_code' => "MAC0413"
            ],
            [
                'id' => 9, 
                'id_group' => 5,
                'subject_code' => "MAC0472"
            ],
            [
                'id' => 10, 
                'id_group' => 6,
                'subject_code' => "MAC0414"
            ],
            [
                'id' => 11, 
                'id_group' => 6,
                'subject_code' => "MAE0221"
            ],
            [
                'id' => 12, 
                'id_group' => 6,
                'subject_code' => "MAT0349"
            ],
            [
                'id' => 13, 
                'id_group' => 6,
                'subject_code' => "MAE0515"
            ],
            [
                'id' => 14, 
                'id_group' => 8,
                'subject_code' => "MAC0317"
            ],
            [
                'id' => 15, 
                'id_group' => 8,
                'subject_code' => "MAC0426"
            ],
            [
                'id' => 16, 
                'id_group' => 8,
                'subject_code' => "MAC0460"
            ],
            [
                'id' => 17, 
                'id_group' => 8,
                'subject_code' => "MAE0221"
            ],
            [
                'id' => 18, 
                'id_group' => 9,
                'subject_code' => "MAE0312"
            ],
            [
                'id' => 19, 
                'id_group' => 9,
                'subject_code' => "MAE0228"
            ],
            [
                'id' => 20, 
                'id_group' => 9,
                'subject_code' => "MAE0580"
            ],
            [
                'id' => 21, 
                'id_group' => 10,
                'subject_code' => "MAC0315"
            ],
            [
                'id' => 22, 
                'id_group' => 10,
                'subject_code' => "MAC0325",
            ],
            [
                'id' => 23, 
                'id_group' => 10,
                'subject_code' => "MAC0427"
            ],
            [
                'id' => 24, 
                'id_group' => 11,
                'subject_code' => "MAC0219"
            ],
            [
                'id' => 25, 
                'id_group' => 11,
                'subject_code' => "MAC0431"
            ]

        ];

        foreach ($subjectsGroup as $subjectGroup) {
            SubjectsGroup::create($subjectGroup);
        }
        
        //SubjectsGroup::factory(10)->create();
    }
} 