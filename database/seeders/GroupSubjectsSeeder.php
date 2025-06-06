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
                'subject_code' => "MAC0425",
                'mandatory' => true
            ],
            [
                'id' => 2,
                'group_id' => 3,
                'subject_code' => "MAC0318",
            ],
            [
                'id' => 3,
                'group_id' => 3,
                'subject_code' => "MAC0444",
            ],
            [
                'id' => 4,
                'group_id' => 3,
                'subject_code' => "MAC0459",
            ],
            [
                'id' => 5,
                'group_id' => 3,
                'subject_code' => "MAC0460",
            ],
            [
                'id' => 6,
                'group_id' => 5,
                'subject_code' => "MAC0218",
            ],
            [
                'id' => 7,
                'group_id' => 5,
                'subject_code' => "MAC0332",
            ],
            [
                'id' => 8,
                'group_id' => 5,
                'subject_code' => "MAC0413",
            ],
            [
                'id' => 9,
                'group_id' => 5,
                'subject_code' => "MAC0472",
            ],
            [
                'id' => 10,
                'group_id' => 6,
                'subject_code' => "MAC0414",
            ],
            [
                'id' => 11,
                'group_id' => 6,
                'subject_code' => "MAE0221",
            ],
            [
                'id' => 12,
                'group_id' => 6,
                'subject_code' => "MAE0228",
            ],
            [
                'id' => 13,
                'group_id' => 6,
                'subject_code' => "MAT0349",
            ],
            [
                'id' => 14,
                'group_id' => 6,
                'subject_code' => "MAE0515",
            ],
            [
                'id' => 15,
                'group_id' => 6,
                'subject_code' => "MAT0111",
            ],
            // Desenvolvimento de Software - Grupo 8
            [
                'id' => 16,
                'group_id' => 8,
                'subject_code' => "MAC0218",
            ],
            [
                'id' => 17,
                'group_id' => 8,
                'subject_code' => "MAC0332",
            ],
            [
                'id' => 18,
                'group_id' => 8,
                'subject_code' => "MAC0346",
            ],
            [
                'id' => 19,
                'group_id' => 8,
                'subject_code' => "MAC0413",
            ],
            [
                'id' => 20,
                'group_id' => 8,
                'subject_code' => "MAC0467",
            ],
            [
                'id' => 21,
                'group_id' => 8,
                'subject_code' => "MAC0470",
            ],
            [
                'id' => 22,
                'group_id' => 8,
                'subject_code' => "MAC0472",
            ],
            [
                'id' => 23,
                'group_id' => 8,
                'subject_code' => "MAC0475",
            ],
            [
                'id' => 24,
                'group_id' => 8,
                'subject_code' => "MAC0446",
            ],
            [
                'id' => 25,
                'group_id' => 8,
                'subject_code' => "PCS3863",
            ],
            // Banco de Dados - Grupo 9
            [
                'id' => 26,
                'group_id' => 9,
                'subject_code' => "MAC0426",
            ],
            [
                'id' => 27,
                'group_id' => 9,
                'subject_code' => "MAC0439",
            ],
            [
                'id' => 28,
                'group_id' => 9,
                'subject_code' => "MAC0459",
            ],
            // Sistemas Paralelos e Distribuídos - Grupo 10
            [
                'id' => 29,
                'group_id' => 10,
                'subject_code' => "MAC0219",
            ],
            [
                'id' => 30,
                'group_id' => 10,
                'subject_code' => "MAC0344",
            ],
            [
                'id' => 31,
                'group_id' => 10,
                'subject_code' => "MAC0352",
            ],
            [
                'id' => 32,
                'group_id' => 10,
                'subject_code' => "MAC0463",
            ],
            [
                'id' => 33,
                'group_id' => 10,
                'subject_code' => "PCS3848",
            ],
            [
                'id' => 34,
                'group_id' => 10,
                'subject_code' => "PCS3858",
            ],
            // Algoritmos - Grupo 12
            [
                'id' => 35, 
                'group_id' => 12, 
                'subject_code' => "MAC0325", 
            ],
            [
                'id' => 36, 
                'group_id' => 12, 
                'subject_code' => "MAC0327", 
            ],
            [
                'id' => 37, 
                'group_id' => 12, 
                'subject_code' => "MAC0331", 
            ],
            [
                'id' => 38, 
                'group_id' => 12, 
                'subject_code' => "MAC0336", 
            ],
            [
                'id' => 39, 
                'group_id' => 12, 
                'subject_code' => "MAC0450", 
            ],
            [
                'id' => 40, 
                'group_id' => 12, 
                'subject_code' => "MAC0465", 
            ],
            [
                'id' => 41, 
                'group_id' => 12, 
                'subject_code' => "MAC0466", 
            ],
            [
                'id' => 42, 
                'group_id' => 12, 
                'subject_code' => "MAC0385", 
            ],
            // Obrigatórias de Algoritmos (Grupo 12)
            [
                'id' => 43, 
                'group_id' => 12, 
                'subject_code' => "MAC0328", 
                'mandatory' => true
            ],
            [
                'id' => 44, 
                'group_id' => 12, 
                'subject_code' => "MAC0414", 
                'mandatory' => true
            ],
            // Matemática Discreta - Grupo 14
            [
                'id' => 45, 
                'group_id' => 14, 
                'subject_code' => "MAC0414", 
            ],
            [
                'id' => 46, 
                'group_id' => 14, 
                'subject_code' => "MAC0436", 
            ],
            [
                'id' => 47, 
                'group_id' => 14, 
                'subject_code' => "MAC0690", 
            ],
            [
                'id' => 48, 
                'group_id' => 14, 
                'subject_code' => "MAC0691", 
            ],
            [
                'id' => 49, 
                'group_id' => 14, 
                'subject_code' => "MAC0692", 
            ],
            [
                'id' => 50, 
                'group_id' => 14, 
                'subject_code' => "MAC0693", 
            ],
            [
                'id' => 51, 
                'group_id' => 14, 
                'subject_code' => "MAC0775", 
            ],
            [
                'id' => 52, 
                'group_id' => 14, 
                'subject_code' => "MAC0776", 
            ],
            [
                'id' => 53, 
                'group_id' => 14, 
                'subject_code' => "MAE0221", 
            ],
            [
                'id' => 54, 
                'group_id' => 14, 
                'subject_code' => "MAE0224", 
            ],
            [
                'id' => 55, 
                'group_id' => 14, 
                'subject_code' => "MAE0228", 
            ],
            [
                'id' => 56, 
                'group_id' => 14, 
                'subject_code' => "MAE0326", 
            ],
            [
                'id' => 57, 
                'group_id' => 14, 
                'subject_code' => "MAT0225", 
            ],
            [
                'id' => 58, 
                'group_id' => 14, 
                'subject_code' => "MAT0234", 
            ],
            [
                'id' => 59, 
                'group_id' => 14, 
                'subject_code' => "MAT0265", 
            ],
            [
                'id' => 60, 
                'group_id' => 14, 
                'subject_code' => "MAT0311", 
            ],
            // Obrigatórias Matemática Discreta (Grupo 14)
            [
                'id' => 61, 
                'group_id' => 14, 
                'subject_code' => "MAC0320",
                'mandatory' => true
            ],
            [
                'id' => 62, 
                'group_id' => 14, 
                'subject_code' => "MAT0206",
                'mandatory' => true
            ],
            [
                'id' => 63, 
                'group_id' => 14, 
                'subject_code' => "MAT0264",
                'mandatory' => true
            ],
            // Otimização - Grupo 16
            [
                'id' => 64, 
                'group_id' => 16, 
                'subject_code' => "MAC0300", 
            ],
            [
                'id' => 65, 
                'group_id' => 16, 
                'subject_code' => "MAC0343", 
            ],
            [
                'id' => 66, 
                'group_id' => 16, 
                'subject_code' => "MAC0418", 
            ],
            [
                'id' => 67, 
                'group_id' => 16, 
                'subject_code' => "MAC0419", 
            ],
            [
                'id' => 68, 
                'group_id' => 16, 
                'subject_code' => "MAC0427", 
            ],
            [
                'id' => 69, 
                'group_id' => 16, 
                'subject_code' => "MAC0450", 
            ],
            [
                'id' => 70, 
                'group_id' => 16, 
                'subject_code' => "MAC0452", 
            ],
            [
                'id' => 71, 
                'group_id' => 16, 
                'subject_code' => "MAC0461", 
            ],
            [
                'id' => 72, 
                'group_id' => 16, 
                'subject_code' => "MAC0473", 
            ],
            [
                'id' => 73, 
                'group_id' => 16, 
                'subject_code' => "MAC0691", 
            ],
            // Obrigatórias de Otimização (Grupo 16)
            [
                'id' => 74, 
                'group_id' => 16, 
                'subject_code' => "MAC0315",
                'mandatory' => true
            ],
            [
                'id' => 75, 
                'group_id' => 16, 
                'subject_code' => "MAC0325",
                'mandatory' => true
            ],
            // Núcleo de disciplinas de Ciência de Dados - Grupo 20
            [
                'id' => 76, 
                'group_id' => 20, 
                'subject_code' => "MAC0460", 
                'mandatory' => true
            ],

            // Pelo menos uma disciplina de Processamento de sinais: - Grupo 21
            [
                'id' => 77, 
                'group_id' => 21, 
                'subject_code' => "MAC0317", 
            ],
            [
                'id' => 78, 
                'group_id' => 21, 
                'subject_code' => "MAC0417", 
            ],

            // Pelo menos uma disciplina de Sistemas: - Grupo 22
            [
                'id' => 79, 
                'group_id' => 22, 
                'subject_code' => "MAC0219", 
            ],
            [
                'id' => 80, 
                'group_id' => 22, 
                'subject_code' => "MAC0431", 
            ],

            // Pelo menos uma disciplina de Banco de Dados: - Grupo 23
            [
                'id' => 81, 
                'group_id' => 23, 
                'subject_code' => "MAC0459", 
            ],
            [
                'id' => 82, 
                'group_id' => 23, 
                'subject_code' => "MAC0426", 
            ],
            [
                'id' => 83, 
                'group_id' => 23, 
                'subject_code' => "MAC0439", 
            ],

            // Pelo menos uma disciplina de Otimização: - Grupo 24
            [
                'id' => 84, 
                'group_id' => 24, 
                'subject_code' => "MAC0315", 
            ],
            [
                'id' => 85, 
                'group_id' => 24, 
                'subject_code' => "MAC0325", 
            ],
            [
                'id' => 86, 
                'group_id' => 24, 
                'subject_code' => "MAC0427", 
            ],

            // Pelo menos uma disciplina de Probabilidade e Estatística dentre estas: - Grupo 25
            [
                'id' => 87, 
                'group_id' => 25, 
                'subject_code' => "MAE0312", 
            ],
            [
                'id' => 88, 
                'group_id' => 25, 
                'subject_code' => "MAE0228", 
            ],
            [
                'id' => 89, 
                'group_id' => 25, 
                'subject_code' => "MAE0580", 
            ],
            [
                'id' => 90, 
                'group_id' => 25, 
                'subject_code' => "MAE0221", 
            ],

            // Pelo menos duas disciplinas de áreas de aplicação: - Grupo 26
            [
                'id' => 91, 
                'group_id' => 26, 
                'subject_code' => "MAC0337", 
            ],
            [
                'id' => 92, 
                'group_id' => 26, 
                'subject_code' => "MAC0341", 
            ],
            [
                'id' => 93, 
                'group_id' => 26, 
                'subject_code' => "MAC0351", 
            ],
            [
                'id' => 94, 
                'group_id' => 26, 
                'subject_code' => "MAC0331", 
            ],
            [
                'id' => 95, 
                'group_id' => 26, 
                'subject_code' => "MAC0375", 
            ],
            [
                'id' => 96, 
                'group_id' => 26, 
                'subject_code' => "MAC0420", 
            ],
            [
                'id' => 97, 
                'group_id' => 26, 
                'subject_code' => "MAC0425", 
            ],
            [
                'id' => 98, 
                'group_id' => 26, 
                'subject_code' => "MAC0446", 
            ],
            [
                'id' => 99, 
                'group_id' => 26, 
                'subject_code' => "MAC0459", 
            ],
            [
                'id' => 100, 
                'group_id' => 26, 
                'subject_code' => "MAC0468", 
            ],
            [
                'id' => 101, 
                'group_id' => 26, 
                'subject_code' => "MAE0515", 
            ],

            // Disciplinas recomendadas para complementar a formação em outras unidades: - Grupo 27
            [
                'id' => 102, 
                'group_id' => 27, 
                'subject_code' => "CMU0449", 
            ],
            [
                'id' => 103, 
                'group_id' => 27, 
                'subject_code' => "CMU0529", 
            ],
            [
                'id' => 104, 
                'group_id' => 27, 
                'subject_code' => "CMU0530", 
            ],
            [
                'id' => 105, 
                'group_id' => 27, 
                'subject_code' => "IPN0007", 
            ],
            [
                'id' => 106, 
                'group_id' => 27, 
                'subject_code' => "PCS2057", 
            ],
            [
                'id' => 107, 
                'group_id' => 27, 
                'subject_code' => "PCS3438", 
            ],
            [
                'id' => 108, 
                'group_id' => 27, 
                'subject_code' => "PMR3508", 
            ],
            [
                'id' => 109, 
                'group_id' => 27, 
                'subject_code' => "PSI2432", 
            ],
            [
                'id' => 110, 
                'group_id' => 27, 
                'subject_code' => "PSI2672", 
            ],
            [
                'id' => 111, 
                'group_id' => 27, 
                'subject_code' => "PSI3461", 
            ],
            [
                'id' => 112, 
                'group_id' => 27, 
                'subject_code' => "PSI3501", 
            ],
            [
                'id' => 113, 
                'group_id' => 27, 
                'subject_code' => "PSI3560", 
            ],
            [
                'id' => 114, 
                'group_id' => 27, 
                'subject_code' => "PSI3571", 
            ],
            [
                'id' => 115, 
                'group_id' => 27, 
                'subject_code' => "PTC3569", 
            ],
            [	
                'id' => 116,
                'group_id' => 28,
                'subject_code' => 'MAC0101',
            ],
            // Disciplinas obrigatórias - Grupo 28
            [	
                'id' => 117,
                'group_id' => 28,
                'subject_code' => 'MAC0105',
                'mandatory' => true
            ],
            [	
                'id' => 118,
                'group_id' => 28,
                'subject_code' => 'MAC0110',
                'mandatory' => true
            ],
            [	
                'id' => 119,
                'group_id' => 28,
                'subject_code' => 'MAC0329',
                'mandatory' => true
            ],
            [	
                'id' => 120,
                'group_id' => 28,
                'subject_code' => 'MAT2453',
                'mandatory' => true
            ],
            [	
                'id' => 121,
                'group_id' => 28,
                'subject_code' => 'MAT0112',
                'mandatory' => true
            ],
            [	
                'id' => 122,
                'group_id' => 28,
                'subject_code' => 'MAC0121',
                'mandatory' => true
            ],
            [	
                'id' => 123,
                'group_id' => 28,
                'subject_code' => 'MAC0216',
                'mandatory' => true
            ],
            [	
                'id' => 124,
                'group_id' => 28,
                'subject_code' => 'MAC0239',
                'mandatory' => true
            ],
            [	
                'id' => 125,
                'group_id' => 28,
                'subject_code' => 'MAE0119',
                'mandatory' => true
            ],
            [	
                'id' => 126,
                'group_id' => 28,
                'subject_code' => 'MAT2454',
                'mandatory' => true
            ],
            [	
                'id' => 127,
                'group_id' => 28,
                'subject_code' => 'MAT0122',
                'mandatory' => true
            ],
            [	
                'id' => 128,
                'group_id' => 28,
                'subject_code' => 'MAC0102',
                'mandatory' => true
            ],
            [	
                'id' => 129,
                'group_id' => 28,
                'subject_code' => 'MAC0209',
                'mandatory' => true
            ],
            [	
                'id' => 130,
                'group_id' => 28,
                'subject_code' => 'MAC0210',
                'mandatory' => true
            ],
            [	
                'id' => 131,
                'group_id' => 28,
                'subject_code' => 'MAC0323',
                'mandatory' => true
            ],
            [	
                'id' => 132,
                'group_id' => 28,
                'subject_code' => 'MAT0236',
                'mandatory' => true
            ],
            [	
                'id' => 133,
                'group_id' => 28,
                'subject_code' => 'MAC0316',
                'mandatory' => true
            ],
            [	
                'id' => 134,
                'group_id' => 28,
                'subject_code' => 'MAC0338',
                'mandatory' => true
            ],
            [	
                'id' => 135,
                'group_id' => 28,
                'subject_code' => 'MAC0350',
                'mandatory' => true
            ],
            [	
                'id' => 136,
                'group_id' => 28,
                'subject_code' => 'MAC0422',
                'mandatory' => true
            ],
            [	
                'id' => 137,
                'group_id' => 28,
                'subject_code' => 'FLC0474',
                'mandatory' => true
            ],
            [	
                'id' => 138,
                'group_id' => 28,
                'subject_code' => 'MAC0499',
                'mandatory' => true
            ]
        ];

        foreach ($groupSubjects as $groupSubject) {
            GroupSubject::create($groupSubject);
        }

        //GroupSubject::factory(10)->create();
    }
}
