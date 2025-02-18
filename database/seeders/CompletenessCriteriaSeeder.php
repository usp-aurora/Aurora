<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CompletenessCriteria;

class CompletenessCriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $criteria = [
            [
                'id' => 1,
                'type' => "Créditos",
                'completeness_value' => "196",
                'id_group' => 1
            ],
            [
                'id' => 2,
                'type' => "Blocos",
                'completeness_value' => "4",
                'id_group' => 2
            ],
            [
                'id' => 3,
                'type' => "Matérias",
                'completeness_value' => "1",
                'id_group' => 3
            ],
            [
                'id' => 4,
                'type' => "Matérias",
                'completeness_value' => "2",
                'id_group' => 4
            ],
            [
                'id' => 5,
                'type' => "Matérias",
                'completeness_value' => "2",
                'id_group' => 5
            ],
            [
                'id' => 6,
                'type' => "Matérias",
                'completeness_value' => "1",
                'id_group' => 6
            ],
            [
                'id' => 7,
                'type' => "Blocos",
                'completeness_value' => "4",
                'id_group' => 7
            ],
            [
                'id' => 8,
                'type' => "Matérias",
                'completeness_value' => "4",
                'id_group' => 8
            ],
            [
                'id' => 9,
                'type' => "Matérias",
                'completeness_value' => "1",
                'id_group' => 9
            ],
            [
                'id' => 10,
                'type' => "Matérias",
                'completeness_value' => "1",
                'id_group' => 10
            ],
            [
                'id' => 11,
                'type' => "Matérias",
                'completeness_value' => "1",
                'id_group' => 11 
            ]
        ];

        foreach ($criteria as $criterion) {
            CompletenessCriteria::create($criterion);
        }
        
        //CompletenessCriteria::factory(15)->create();
    }
}
 