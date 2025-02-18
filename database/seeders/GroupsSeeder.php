<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Group;

class GroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            [
                'id' => 1,
                'title' => "Bacharelado em Ciência da Computação [2025]",
                'description' => "Curso do BCC do IME-USP :)",
                'parent_group_id' => null   
            ],
            [
                'id' => 2,
                'title' => "Trilha de Inteligência Artificial",
                'description' => "Essa é a trilha de IA do BCC :)",
                'parent_group_id' => 1   
            ],
            [
                'id' => 3,
                'title' => "Trilha de Inteligência Artificial - Inteligência Artificial",
                'description' => "Essa é a subtrilha Inteligência Artificial da trilha de IA do BCC :)",
                'parent_group_id' => 2   
            ],
            [
                'id' => 4,
                'title' => "Trilha de Inteligência Artificial - Introdução à IA",
                'description' => "Essa é a subtrilha Introdução à IA da trilha de IA do BCC :)",
                'parent_group_id' => 2   
            ],
            [
                'id' => 5,
                'title' => "Trilha de Inteligência Artificial - Sistemas",
                'description' => "Essa é a subtrilha Sistemas da trilha de IA do BCC :)",
                'parent_group_id' => 2   
            ],
            [
                'id' => 6,
                'title' => "Trilha de Inteligência Artificial - Teoria associada à IA",
                'description' => "Essa é a subtrilha Teoria associada à IA da trilha de IA do BCC :)",
                'parent_group_id' => 2   
            ],
            [
                'id' => 7,
                'title' => "Trilha de Ciência de Dados",
                'description' => "Essa é a trilha de Ciência de Dados do BCC :)",
                'parent_group_id' => 1
            ],
            [
                'id' => 8,
                'title' => "Trilha de Ciência de Dados - Núcleo 1",
                'description' => "Essa é a subtrilha Núcleo 1 da trilha de Ciência de Dados do BCC :)",
                'parent_group_id' => 7
            ],
            [
                'id' => 9,
                'title' => "Trilha de Ciência de Dados - Núcleo 2",
                'description' => "Essa é a subtrilha Núcleo 2 da trilha de Ciência de Dados do BCC :)",
                'parent_group_id' => 7
            ],
            [
                'id' => 10,
                'title' => "Trilha de Ciência de Dados - Núcleo 3",
                'description' => "Essa é a subtrilha Núcleo 3 da trilha de Ciência de Dados do BCC :)",
                'parent_group_id' => 7
            ],
            [
                'id' => 11,
                'title' => "Trilha de Ciência de Dados - Núcleo 4",
                'description' => "Essa é a subtrilha Núcleo 4 da trilha de Ciência de Dados do BCC :)",
                'parent_group_id' => 7
            ]
        ];

        foreach ($groups as $group) {
            Group::create($group);
        }
        
        //Grupo::factory(15)->create();
    }
}
 