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
        $materias = [
            [
                'codigo_materia' => "MAC0425",
                'nome' => "Inteligência Artificial",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 2
            ],
            [
                'codigo_materia' => "MAC0318",
                'nome' => "Introdução à Programação de Robôs Móveis",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0444",
                'nome' => "Sistemas Baseados em Conhecimento",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0459",
                'nome' => "Ciência e Engenharia de Dados",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0460",
                'nome' => "Introdução ao aprendizado de máquina",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0218",
                'nome' => "Técnicas de Programação II",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 2
            ],
            [
                'codigo_materia' => "MAC0332",
                'nome' => "Engenharia de Software",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 2
            ],
            [
                'codigo_materia' => "MAC0413",
                'nome' => "Tópicos Avançados de Programação Orientada a Objetos",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 2
            ],
            [
                'codigo_materia' => "MAC0472",
                'nome' => "Laboratório de Métodos Ágeis",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 2
            ],
            [
                'codigo_materia' => "MAC0414",
                'nome' => "Autômatos, Computabilidade e Complexidade",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAE0221",
                'nome' => "Probabilidade I",
                'ementa' => "carpe diem",
                'creditos_aula' => 6,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAT0349",
                'nome' => "Introdução à Lógica",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAE0515",
                'nome' => "Introdução à Teoria dos Jogos",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0317",
                'nome' => "Introdução ao Processamento de Sinais Digitais",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0426",
                'nome' => "Sistemas de Bancos de Dados",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAE0312",
                'nome' => "Introdução aos Processos Estocásticos",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAE0228",
                'nome' => "Noções de Probabilidade e Processos Estocásticos",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAE0580",
                'nome' => "Introdução à aprendizagem estatística",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0315",
                'nome' => "Otimização Linear",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0325",
                'nome' => "Otimização Combinatória",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0427",
                'nome' => "Otimização Não Linear",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0219",
                'nome' => "Programação Concorrente e Paralela",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ],
            [
                'codigo_materia' => "MAC0431",
                'nome' => "Introdução à Computação Paralela e Distribuída",
                'ementa' => "carpe diem",
                'creditos_aula' => 4,
                'creditos_trabalho' => 0
            ]
        ];

        foreach ($materias as $materia) {
            Materia::create($materia);
        }
        
        //Materia::factory(150)->create();
    }
}
  