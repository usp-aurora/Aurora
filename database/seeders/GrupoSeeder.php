<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Grupo;

class GrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grupos = [
            [
                'id' => 1,
                'titulo' => "Bacharelado em Ciência da Computação [2025]",
                'descricao' => "Curso do BCC do IME-USP :)",
                'id_grupo_pai' => null   
            ],
            [
                'id' => 2,
                'titulo' => "Trilha de Inteligência Artificial",
                'descricao' => "Essa é a trilha de IA do BCC :)",
                'id_grupo_pai' => 1   
            ],
            [
                'id' => 3,
                'titulo' => "Trilha de Inteligência Artificial - Inteligência Artificial",
                'descricao' => "Essa é a subtrilha Inteligência Artificial da trilha de IA do BCC :)",
                'id_grupo_pai' => 2   
            ],
            [
                'id' => 4,
                'titulo' => "Trilha de Inteligência Artificial - Introdução à IA",
                'descricao' => "Essa é a subtrilha Introdução à IA da trilha de IA do BCC :)",
                'id_grupo_pai' => 2   
            ],
            [
                'id' => 5,
                'titulo' => "Trilha de Inteligência Artificial - Sistemas",
                'descricao' => "Essa é a subtrilha Sistemas da trilha de IA do BCC :)",
                'id_grupo_pai' => 2   
            ],
            [
                'id' => 6,
                'titulo' => "Trilha de Inteligência Artificial - Teoria associada à IA",
                'descricao' => "Essa é a subtrilha Teoria associada à IA da trilha de IA do BCC :)",
                'id_grupo_pai' => 2   
            ],
            [
                'id' => 7,
                'titulo' => "Trilha de Ciência de Dados",
                'descricao' => "Essa é a trilha de Ciência de Dados do BCC :)",
                'id_grupo_pai' => 1
            ],
            [
                'id' => 8,
                'titulo' => "Trilha de Ciência de Dados - Núcleo 1",
                'descricao' => "Essa é a subtrilha Núcleo 1 da trilha de Ciência de Dados do BCC :)",
                'id_grupo_pai' => 7
            ],
            [
                'id' => 9,
                'titulo' => "Trilha de Ciência de Dados - Núcleo 2",
                'descricao' => "Essa é a subtrilha Núcleo 2 da trilha de Ciência de Dados do BCC :)",
                'id_grupo_pai' => 7
            ],
            [
                'id' => 10,
                'titulo' => "Trilha de Ciência de Dados - Núcleo 3",
                'descricao' => "Essa é a subtrilha Núcleo 3 da trilha de Ciência de Dados do BCC :)",
                'id_grupo_pai' => 7
            ],
            [
                'id' => 11,
                'titulo' => "Trilha de Ciência de Dados - Núcleo 4",
                'descricao' => "Essa é a subtrilha Núcleo 4 da trilha de Ciência de Dados do BCC :)",
                'id_grupo_pai' => 7
            ]
        ];

        foreach ($grupos as $grupo) {
            Grupo::create($grupo);
        }
        
        //Grupo::factory(15)->create();
    }
}
 