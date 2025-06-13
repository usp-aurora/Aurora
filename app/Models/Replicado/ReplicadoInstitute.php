<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ReplicadoInstitute extends Model
{
    protected $connection = "replicado";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if (!config('services.replicado_is_active')) {
            $query = parent::newQuery()->fromSub($this->fakeInstitutoQuery(), 'subtable');
        } else {
            $query = parent::newQuery()->fromSub("SELECT 
                                                    t.id AS id,
                                                    t.name AS name,
                                                    t.city_id AS city_id,
                                                    t.city_name AS city_name,
                                                    t.campus_id AS campus_id,
                                                    c.sglpticam AS campus_name,
                                                    t.created_at
                                                FROM (
                                                    SELECT
                                                        u.codund AS id,
                                                        u.nomund AS name,
                                                        ca.codcam AS city_id,
                                                        ca.nomcam AS city_name,
                                                        s.numpticam AS campus_id,
                                                        u.dtainival AS created_at
                                                    FROM
                                                        replicado.dbo.UNIDADE as u
                                                    INNER JOIN (
                                                        SELECT 
                                                            codcam, 
                                                            nomcam
                                                        FROM replicado.dbo.CAMPUS as c
                                                        GROUP BY codcam, nomcam
                                                    ) as ca ON u.codcam = ca.codcam
                                                    INNER JOIN (
                                                        SELECT 
                                                            codund, 
                                                            numpticam
                                                        FROM (
                                                            SELECT 
                                                                codund, 
                                                                numpticam, 
                                                                COUNT(*) AS frequencia,
                                                                ROW_NUMBER() OVER (PARTITION BY codund ORDER BY COUNT(*) DESC) AS rn
                                                            FROM replicado.dbo.ENDUSP
                                                            GROUP BY codund, numpticam
                                                        ) AS subconsulta
                                                        WHERE rn = 1
                                                    ) s ON u.codund = s.codund
                                                ) t
                                                JOIN (
                                                    SELECT 
                                                        codcam, 
                                                        numpticam, 
                                                        sglpticam
                                                    FROM replicado.dbo.CAMPUS
                                                ) as c ON t.campus_id = c.numpticam
                                                WHERE t.campus_id = c.numpticam
                                                AND t.city_id = c.codcam", 'subtable');
        }

        return $query;
    }


    private function fakeInstitutoQuery()
    {
        $cidades = [
            10 => 'São Paulo',
            20 => 'Bauru',
            30 => 'Piracicaba',
            40 => 'Pirassununga',
            50 => 'São Carlos',
            60 => 'Ribeirão Preto',
            70 => 'Lorena',
        ];
        $prefixos = ['Instituto', 'Centro', 'Escola', 'Faculdade', 'Serviço', 'Fundação'];
        $areas = [
            'Energia e Ambiente',
            'Direito',
            'Medicina',
            'Saúde Pública',
            'Enfermagem',
            'Filosofia, Letras e Ciências Humanas',
            'Ciências Farmacêuticas',
            'Medicina Veterinária e Zootecnia',
            'Economia',
            'Astronomia e Geofísica',
            'Arquitetura e Urbanismo e de Design',
            'Odontologia',
            'Agricultura',
            'Comunicações e Artes',
            'Pesquisas Matemáticas',
            'Biologia Marinha',
            'Geografia',
            'Arqueologia e Etnologia',
            'Zoologia',
            'Educação Física e Esporte',
            'Biociências',
            'Ciências Biomédicas',
            'Física',
            'Geociências',
            'Matemática e Estatística',
            'Química',
            'Psicologia',
            'Educação',
            'Relações Internacionais',
            'Bibliotecas e Coleções Digitais',
            'Engenharia',
        ];

        $faker = Faker::create();
        $fakeData = [];

        for ($i = 0; $i < 20; $i++) {
            $idCidade = $faker->randomElement([10, 20, 30, 40, 50, 60, 70]);
            $fakeData[] = [
                'id' => $faker->numberBetween(1, 100),
                'name' => $faker->randomElement($prefixos) . ' de ' . $faker->randomElement($areas),
                'city_id' => $idCidade,
                'city_name' => $cidades[$idCidade],
                'campus_id' => $faker->numberBetween(1, 5),
                'campus_name' => 'Algum campus',
                'created_at' => $faker->date(),
                //'updated_at' => now(),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['id']}' as id,
                           '{$row['name']}' as name,
                           '{$row['city_id']}' as city_id,
                           '{$row['city_name']}' as city_name,
                           '{$row['campus_id']}' as campus_id,
                           '{$row['campus_name']}' as campus_name,
                           '{$row['created_at']}' as created_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
