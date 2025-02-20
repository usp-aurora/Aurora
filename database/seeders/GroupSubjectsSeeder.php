<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GroupSubject;

class GroupSubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $groupSubjects = [
            [
                'id' => 1, 
                'group_id' => 3,
                'subject_code' => "MAC0425"
            ],
            [
                'id' => 2, 
                'group_id' => 4,
                'subject_code' => "MAC0318"
            ],
            [
                'id' => 3, 
                'group_id' => 4,
                'subject_code' => "MAC0444"
            ],
            [
                'id' => 4, 
                'group_id' => 4,
                'subject_code' => "MAC0459"
            ],
            [
                'id' => 5, 
                'group_id' => 4,
                'subject_code' => "MAC0460"
            ],
            [
                'id' => 6, 
                'group_id' => 5,
                'subject_code' => "MAC0218"
            ],
            [
                'id' => 7, 
                'group_id' => 5,
                'subject_code' => "MAC0332"
            ],
            [
                'id' => 8, 
                'group_id' => 5,
                'subject_code' => "MAC0413"
            ],
            [
                'id' => 9, 
                'group_id' => 5,
                'subject_code' => "MAC0472"
            ],
            [
                'id' => 10, 
                'group_id' => 6,
                'subject_code' => "MAC0414"
            ],
            [
                'id' => 11, 
                'group_id' => 6,
                'subject_code' => "MAE0221"
            ],
            [
                'id' => 12, 
                'group_id' => 6,
                'subject_code' => "MAT0349"
            ],
            [
                'id' => 13, 
                'group_id' => 6,
                'subject_code' => "MAE0515"
            ],
            [
                'id' => 14, 
                'group_id' => 8,
                'subject_code' => "MAC0317"
            ],
            [
                'id' => 15, 
                'group_id' => 8,
                'subject_code' => "MAC0426"
            ],
            [
                'id' => 16, 
                'group_id' => 8,
                'subject_code' => "MAC0460"
            ],
            [
                'id' => 17, 
                'group_id' => 8,
                'subject_code' => "MAE0221"
            ],
            [
                'id' => 18, 
                'group_id' => 9,
                'subject_code' => "MAE0312"
            ],
            [
                'id' => 19, 
                'group_id' => 9,
                'subject_code' => "MAE0228"
            ],
            [
                'id' => 20, 
                'group_id' => 9,
                'subject_code' => "MAE0580"
            ],
            [
                'id' => 21, 
                'group_id' => 10,
                'subject_code' => "MAC0315"
            ],
            [
                'id' => 22, 
                'group_id' => 10,
                'subject_code' => "MAC0325",
            ],
            [
                'id' => 23, 
                'group_id' => 10,
                'subject_code' => "MAC0427"
            ],
            [
                'id' => 24, 
                'group_id' => 11,
                'subject_code' => "MAC0219"
            ],
            [
                'id' => 25, 
                'group_id' => 11,
                'subject_code' => "MAC0431"
            ]

        ];

        foreach ($groupSubjects as $groupSubject) {
            GroupSubject::create($groupSubject);
        }
        
        //GroupSubject::factory(10)->create();
    }
} 