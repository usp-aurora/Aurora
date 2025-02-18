<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            [
                'subject_code' => "MAC0425",
                'name' => "Inteligência Artificial",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'subject_code' => "MAC0318",
                'name' => "Introdução à Programação de Robôs Móveis",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0444",
                'name' => "Sistemas Baseados em Conhecimento",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0459",
                'name' => "Ciência e Engenharia de Dados",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0460",
                'name' => "Introdução ao aprendizado de máquina",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0218",
                'name' => "Técnicas de Programação II",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'subject_code' => "MAC0332",
                'name' => "Engenharia de Software",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'subject_code' => "MAC0413",
                'name' => "Tópicos Avançados de Programação Orientada a Objetos",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'subject_code' => "MAC0472",
                'name' => "Laboratório de Métodos Ágeis",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'subject_code' => "MAC0414",
                'name' => "Autômatos, Computabilidade e Complexidade",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAE0221",
                'name' => "Probabilidade I",
                'syllabus' => "carpe diem",
                'lecture_credits' => 6,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAT0349",
                'name' => "Introdução à Lógica",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAE0515",
                'name' => "Introdução à Teoria dos Jogos",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0317",
                'name' => "Introdução ao Processamento de Sinais Digitais",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0426",
                'name' => "Sistemas de Bancos de Dados",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAE0312",
                'name' => "Introdução aos Processos Estocásticos",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAE0228",
                'name' => "Noções de Probabilidade e Processos Estocásticos",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAE0580",
                'name' => "Introdução à aprendizagem estatística",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0315",
                'name' => "Otimização Linear",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0325",
                'name' => "Otimização Combinatória",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0427",
                'name' => "Otimização Não Linear",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0219",
                'name' => "Programação Concorrente e Paralela",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'subject_code' => "MAC0431",
                'name' => "Introdução à Computação Paralela e Distribuída",
                'syllabus' => "carpe diem",
                'lecture_credits' => 4,
                'work_credits' => 0
            ]
        ];

        foreach ($subjects as $Subject) {
            Subject::create($Subject);
        }
        
        //Subject::factory(150)->create();
    }
}
  