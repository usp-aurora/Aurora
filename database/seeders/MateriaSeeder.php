<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Materia;

class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $materia = [
            'nome' => "Introdução à Computação",
            'codigo' => "MAC0110",
            'ementa' => "Introduzir conceitos básicos da Ciência da Computação por meio do estudo de uma linguagem algorítmica e de exercícios práticos. ",
            'creditos_aula' => 4,
            'creditos_trabalho' => 0
        ];
        Materia::create($materia);
        Materia::factory(150)->create();
    }
}
