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
                'group_id' => 3,
                'subject_code' => "MAC0425",
                'mandatory' => true
            ],
            [
                'group_id' => 3,
                'subject_code' => "MAC0318",
            ],
            [
                'group_id' => 3,
                'subject_code' => "MAC0444",
            ],
            [
                'group_id' => 3,
                'subject_code' => "MAC0459",
            ],
            [
                'group_id' => 3,
                'subject_code' => "MAC0460",
            ],
            [
                'group_id' => 5,
                'subject_code' => "MAC0218",
            ],
            [
                'group_id' => 5,
                'subject_code' => "MAC0332",
            ],
            [
                'group_id' => 5,
                'subject_code' => "MAC0413",
            ],
            [
                'group_id' => 5,
                'subject_code' => "MAC0472",
            ],
            [
                'group_id' => 6,
                'subject_code' => "MAC0414",
            ],
            [
                'group_id' => 6,
                'subject_code' => "MAE0221",
            ],
            [
                'group_id' => 6,
                'subject_code' => "MAE0228",
            ],
            [
                'group_id' => 6,
                'subject_code' => "MAT0349",
            ],
            [
                'group_id' => 6,
                'subject_code' => "MAE0515",
            ],
            // Desenvolvimento de Software - Grupo 8
            [
                'group_id' => 8,
                'subject_code' => "MAC0218",
            ],
            [
                'group_id' => 8,
                'subject_code' => "MAC0332",
            ],
            [
                'group_id' => 8,
                'subject_code' => "MAC0346",
            ],
            [
                'group_id' => 8,
                'subject_code' => "MAC0413",
            ],
            [
                'group_id' => 8,
                'subject_code' => "MAC0467",
            ],
            [
                'group_id' => 8,
                'subject_code' => "MAC0470",
            ],
            [
                'group_id' => 8,
                'subject_code' => "MAC0472",
            ],
            [
                'group_id' => 8,
                'subject_code' => "MAC0475",
            ],
            [
                'group_id' => 8,
                'subject_code' => "MAC0446",
            ],
            [
                'group_id' => 8,
                'subject_code' => "PCS3863",
            ],
            // Banco de Dados - Grupo 9
            [
                'group_id' => 9,
                'subject_code' => "MAC0426",
            ],
            [
                'group_id' => 9,
                'subject_code' => "MAC0439",
            ],
            [
                'group_id' => 9,
                'subject_code' => "MAC0459",
            ],
            // Sistemas Paralelos e Distribuídos - Grupo 10
            [
                'group_id' => 10,
                'subject_code' => "MAC0219",
            ],
            [
                'group_id' => 10,
                'subject_code' => "MAC0344",
            ],
            [
                'group_id' => 10,
                'subject_code' => "MAC0352",
            ],
            [
                'group_id' => 10,
                'subject_code' => "MAC0463",
            ],
            [
                'group_id' => 10,
                'subject_code' => "PCS3848",
            ],
            [
                'group_id' => 10,
                'subject_code' => "PCS3858",
            ],
            // Algoritmos - Grupo 12
            [
                'group_id' => 12,
                'subject_code' => "MAC0328",
                'mandatory' => true
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0414",
                'mandatory' => true
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0325",
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0327",
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0331",
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0336",
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0450",
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0465",
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0466",
            ],
            [
                'group_id' => 12,
                'subject_code' => "MAC0385",
            ],
            // Matemática Discreta - Grupo 14
            [
                'group_id' => 14,
                'subject_code' => "MAC0320",
                'mandatory' => true
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAT0206",
                'mandatory' => true
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAT0264",
                'mandatory' => true
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAC0414",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAC0436",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAC0690",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAC0691",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAC0692",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAC0693",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAC0775",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAC0776",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAE0221",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAE0224",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAE0228",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAE0326",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAT0225",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAT0234",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAT0265",
            ],
            [
                'group_id' => 14,
                'subject_code' => "MAT0311",
            ],
            // Otimização - Grupo 16
            [
                'group_id' => 16,
                'subject_code' => "MAC0315",
                'mandatory' => true
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0325",
                'mandatory' => true
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0300",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0343",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0418",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0419",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0427",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0450",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0452",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0461",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0473",
            ],
            [
                'group_id' => 16,
                'subject_code' => "MAC0691",
            ],
            // Núcleo de disciplinas de Ciência de Dados - Grupo 20
            [
                'group_id' => 20,
                'subject_code' => "MAC0460",
                'mandatory' => true
            ],

            // Pelo menos uma disciplina de Processamento de sinais: - Grupo 21
            [
                'group_id' => 21,
                'subject_code' => "MAC0317",
            ],
            [
                'group_id' => 21,
                'subject_code' => "MAC0417",
            ],

            // Pelo menos uma disciplina de Sistemas: - Grupo 22
            [
                'group_id' => 22,
                'subject_code' => "MAC0219",
            ],
            [
                'group_id' => 22,
                'subject_code' => "MAC0431",
            ],

            // Pelo menos uma disciplina de Banco de Dados: - Grupo 23
            [
                'group_id' => 23,
                'subject_code' => "MAC0459",
            ],
            [
                'group_id' => 23,
                'subject_code' => "MAC0426",
            ],
            [
                'group_id' => 23,
                'subject_code' => "MAC0439",
            ],

            // Pelo menos uma disciplina de Otimização: - Grupo 24
            [
                'group_id' => 24,
                'subject_code' => "MAC0315",
            ],
            [
                'group_id' => 24,
                'subject_code' => "MAC0325",
            ],
            [
                'group_id' => 24,
                'subject_code' => "MAC0427",
            ],

            // Pelo menos uma disciplina de Probabilidade e Estatística dentre estas: - Grupo 25
            [
                'group_id' => 25,
                'subject_code' => "MAE0312",
            ],
            [
                'group_id' => 25,
                'subject_code' => "MAE0228",
            ],
            [
                'group_id' => 25,
                'subject_code' => "MAE0580",
            ],
            [
                'group_id' => 25,
                'subject_code' => "MAE0221",
            ],

            // Pelo menos duas disciplinas de áreas de aplicação: - Grupo 26
            [
                'group_id' => 26,
                'subject_code' => "MAC0337",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0341",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0351",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0331",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0375",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0420",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0425",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0446",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0459",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAC0468",
            ],
            [
                'group_id' => 26,
                'subject_code' => "MAE0515",
            ],

            // Disciplinas recomendadas para complementar a formação em outras unidades: - Grupo 27
            [
                'group_id' => 27,
                'subject_code' => "CMU0449",
            ],
            [
                'group_id' => 27,
                'subject_code' => "CMU0529",
            ],
            [
                'group_id' => 27,
                'subject_code' => "CMU0530",
            ],
            [
                'group_id' => 27,
                'subject_code' => "IPN0007",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PCS2057",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PCS3438",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PMR3508",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PSI2432",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PSI2672",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PSI3461",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PSI3501",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PSI3560",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PSI3571",
            ],
            [
                'group_id' => 27,
                'subject_code' => "PTC3569",
            ],
            // Disciplinas obrigatórias - Grupo 28
            [
                'group_id' => 28,
                'subject_code' => 'MAC0101',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0105',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0110',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0329',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAT2453',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAT0112',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0121',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0216',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0239',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAE0119',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAT2454',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAT0122',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0102',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0209',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0210',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0323',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAT0236',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0316',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0338',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0350',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0422',
                'mandatory' => true
            ],
            [
                'group_id' => 28,
                'subject_code' => 'MAC0499',
                'mandatory' => true
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2007',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2023',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2028',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2033',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2037',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2038',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2048',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2066',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2067',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2068',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2076',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2077',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2078',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2086',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2087',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2096',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2098',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2106',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2107',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2108',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2117',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2118',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2127',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'ACH2137',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'AUH2803',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'AUP1301',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'AUP2409',
            ],
            [
                'group_id' => 29,
                'subject_code' => '4302112',
            ],
            [
                'group_id' => 29,
                'subject_code' => '4302401',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'IOF0115',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'IOF0255',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'IOF0265',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'GMG0630',
            ],
            [
                'group_id' => 29,
                'subject_code' => '0440620',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'CJE0642',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0213',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0214',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0215',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0218',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0219',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0242',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0300',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0315',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0317',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0318',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0319',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0320',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0322',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0325',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0326',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0327',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0328',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0331',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0332',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0333',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0336',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0337',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0340',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0341',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0343',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0344',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0345',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0346',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0351',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0352',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0375',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0385',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0412',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0413',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0414',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0416',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0417',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0419',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0420',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0424',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0425',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0426',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0427',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0430',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0431',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0432',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0434',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0435',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0436',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0438',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0439',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0441',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0444',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0446',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0447',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0448',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0450',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0451',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0452',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0453',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0456',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0458',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0459',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0460',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0463',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0464',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0465',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0466',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0467',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0468',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0470',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0471',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0472',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0473',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0474',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0475',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0485',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0536',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0546',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0552',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0690',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0691',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0692',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0693',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0775',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAC0776',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0217',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0221',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0224',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0228',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0311',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0312',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0314',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0315',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0325',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0326',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0328',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0330',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0399',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0515',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAE0532',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAP0313',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAP2001',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAP2210',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAP2220',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAP2310',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAP2321',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAP2411',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0206',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0222',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0223',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0225',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0234',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0264',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0265',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0311',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0330',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0350',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0359',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'MAT0364',
            ],
            [
                'group_id' => 29,
                'subject_code' => '0323100',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'PCS0210',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'PCS0216',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'PCS2305',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'PCS3345',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'PCS3529',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'PCS3549',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0102',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0104',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0106',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0116',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0126',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0204',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0230',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0250',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ0317',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ1252',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ1354',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ2457',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ2502',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ2503',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ2505',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ2507',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ2508',
            ],
            [
                'group_id' => 29,
                'subject_code' => 'QBQ2509',
            ],
            [
                'group_id' => 30,
                'subject_code' => 'MAE0217'
            ],
            [
                'group_id' => 30,
                'subject_code' => 'MAE0221'
            ],
            [
                'group_id' => 30,
                'subject_code' => 'MAE0224'
            ],
            [
                'group_id' => 30,
                'subject_code' => 'MAE0228'
            ],
            [
                'group_id' => 30,
                'subject_code' => 'MAE0312'
            ],
            [
                'group_id' => 30,
                'subject_code' => 'MAE0399'
            ],
            [
                'group_id' => 30,
                'subject_code' => 'MAE0499'
            ],
            [
                'group_id' => 30,
                'subject_code' => 'MAE0515'
            ],
            [
                'group_id' => 31,
                'subject_code' => 'FLC0474'
            ],
            [
                'group_id' => 31,
                'subject_code' => 'FLC1476'
            ],
            [
                'group_id' => 31,
                'subject_code' => 'AUH2803'
            ],
            [
                'group_id' => 31,
                'subject_code' => 'AUP1301'
            ],
            [
                'group_id' => 31,
                'subject_code' => 'AUP2409'
            ],
            [
                'group_id' => 31,
                'subject_code' => '1610041'
            ],
            [
                'group_id' => 32,
                'subject_code' => '4302112'
            ],
            [
                'group_id' => 32,
                'subject_code' => '4302401'
            ],
            [
                'group_id' => 32,
                'subject_code' => 'GMG0630'
            ],
            [
                'group_id' => 32,
                'subject_code' => '0440620'
            ],
            [
                'group_id' => 32,
                'subject_code' => 'QBQ0104'
            ],
            [
                'group_id' => 32,
                'subject_code' => 'QBQ1252'
            ],
            [
                'group_id' => 32,
                'subject_code' => 'QBQ1354'
            ],
            [
                'group_id' => 32,
                'subject_code' => 'AGA0215'
            ],
        ];

        foreach ($groupSubjects as $groupSubject) {
            GroupSubject::create($groupSubject);
        }

        //GroupSubject::factory(10)->create();
    }
}
