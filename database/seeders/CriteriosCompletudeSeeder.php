<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CriteriosCompletude;

class CriteriosCompletudeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $criterios = [
            [
                'id' => 1,
                'tipo' => "Créditos",
                'valor_completude' => "196",
                'id_grupo' => 1
            ],
            [
                'id' => 2,
                'tipo' => "Blocos",
                'valor_completude' => "4",
                'id_grupo' => 2
            ],
            [
                'id' => 3,
                'tipo' => "Matérias",
                'valor_completude' => "1",
                'id_grupo' => 3
            ],
            [
                'id' => 4,
                'tipo' => "Matérias",
                'valor_completude' => "2",
                'id_grupo' => 4
            ],
            [
                'id' => 5,
                'tipo' => "Matérias",
                'valor_completude' => "2",
                'id_grupo' => 5
            ],
            [
                'id' => 6,
                'tipo' => "Matérias",
                'valor_completude' => "1",
                'id_grupo' => 6
            ],
            [
                'id' => 7,
                'tipo' => "Blocos",
                'valor_completude' => "4",
                'id_grupo' => 7
            ],
            [
                'id' => 8,
                'tipo' => "Matérias",
                'valor_completude' => "4",
                'id_grupo' => 8
            ],
            [
                'id' => 9,
                'tipo' => "Matérias",
                'valor_completude' => "1",
                'id_grupo' => 9
            ],
            [
                'id' => 10,
                'tipo' => "Matérias",
                'valor_completude' => "1",
                'id_grupo' => 10
            ],
            [
                'id' => 11,
                'tipo' => "Matérias",
                'valor_completude' => "1",
                'id_grupo' => 11 
            ]
        ];

        foreach ($criterios as $criterio) {
            CriteriosCompletude::create($criterio);
        }
        
        //CriteriosCompletude::factory(15)->create();
    }
}
 