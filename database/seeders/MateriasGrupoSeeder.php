<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MateriasGrupo;

class MateriasGrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $materiasGrupo = [
            [
                'id' => 1, 
                'id_grupo' => 3,
                'codigo_materia' => "MAC0425"
            ],
            [
                'id' => 2, 
                'id_grupo' => 4,
                'codigo_materia' => "MAC0318"
            ],
            [
                'id' => 3, 
                'id_grupo' => 4,
                'codigo_materia' => "MAC0444"
            ],
            [
                'id' => 4, 
                'id_grupo' => 4,
                'codigo_materia' => "MAC0459"
            ],
            [
                'id' => 5, 
                'id_grupo' => 4,
                'codigo_materia' => "MAC0460"
            ],
            [
                'id' => 6, 
                'id_grupo' => 5,
                'codigo_materia' => "MAC0218"
            ],
            [
                'id' => 7, 
                'id_grupo' => 5,
                'codigo_materia' => "MAC0332"
            ],
            [
                'id' => 8, 
                'id_grupo' => 5,
                'codigo_materia' => "MAC0413"
            ],
            [
                'id' => 9, 
                'id_grupo' => 5,
                'codigo_materia' => "MAC0472"
            ],
            [
                'id' => 10, 
                'id_grupo' => 6,
                'codigo_materia' => "MAC0414"
            ],
            [
                'id' => 11, 
                'id_grupo' => 6,
                'codigo_materia' => "MAE0221"
            ],
            [
                'id' => 12, 
                'id_grupo' => 6,
                'codigo_materia' => "MAT0349"
            ],
            [
                'id' => 13, 
                'id_grupo' => 6,
                'codigo_materia' => "MAE0515"
            ],
            [
                'id' => 14, 
                'id_grupo' => 8,
                'codigo_materia' => "MAC0317"
            ],
            [
                'id' => 15, 
                'id_grupo' => 8,
                'codigo_materia' => "MAC0426"
            ],
            [
                'id' => 16, 
                'id_grupo' => 8,
                'codigo_materia' => "MAC0460"
            ],
            [
                'id' => 17, 
                'id_grupo' => 8,
                'codigo_materia' => "MAE0221"
            ],
            [
                'id' => 18, 
                'id_grupo' => 9,
                'codigo_materia' => "MAE0312"
            ],
            [
                'id' => 19, 
                'id_grupo' => 9,
                'codigo_materia' => "MAE0228"
            ],
            [
                'id' => 20, 
                'id_grupo' => 9,
                'codigo_materia' => "MAE0580"
            ],
            [
                'id' => 21, 
                'id_grupo' => 10,
                'codigo_materia' => "MAC0315"
            ],
            [
                'id' => 22, 
                'id_grupo' => 10,
                'codigo_materia' => "MAC0325",
            ],
            [
                'id' => 23, 
                'id_grupo' => 10,
                'codigo_materia' => "MAC0427"
            ],
            [
                'id' => 24, 
                'id_grupo' => 11,
                'codigo_materia' => "MAC0219"
            ],
            [
                'id' => 25, 
                'id_grupo' => 11,
                'codigo_materia' => "MAC0431"
            ]

        ];

        foreach ($materiasGrupo as $materiaGrupo) {
            MateriasGrupo::create($materiaGrupo);
        }
        
        //MateriasGrupo::factory(10)->create();
    }
} 