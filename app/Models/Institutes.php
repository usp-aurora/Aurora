<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

# Fechou.
class Institutes extends Model
{
    protected $connection = "jupiter";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if (!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeInstitutoQuery(), 'subtable');
        } else {

            $query = parent::newQuery()->fromSub(function ($query) {
                DB::raw("WITH 
                    cidades_agrupadas AS (
                        SELECT codcam, nomcam
                        FROM replicado.dbo.CAMPUS c
                        GROUP BY codcam, nomcam
                    ),
                    subcampus AS (
                        SELECT codund, numpticam
                        FROM (
                            SELECT codund, numpticam, COUNT(*) AS frequencia,
                                ROW_NUMBER() OVER (PARTITION BY codund ORDER BY COUNT(*) DESC) AS rn
                            FROM replicado.dbo.ENDUSP
                            GROUP BY codund, numpticam
                        ) AS subconsulta
                        WHERE rn = 1
                    ),
                    campus AS (
                        SELECT codcam, numpticam, sglpticam FROM replicado.dbo.CAMPUS
                    ),
                    tabela AS (
                        SELECT
                            u.codund AS id_unidade,
                            u.nomund AS nome_unidade,
                            ca.codcam AS id_cidade,
                            ca.nomcam AS nome_cidade,
                            s.numpticam AS id_campus,
                            u.dtainival AS created_at
                        FROM
                            replicado.dbo.UNIDADE u
                        INNER JOIN cidades_agrupadas ca ON u.codcam = ca.codcam
                        INNER JOIN subcampus s ON u.codund = s.codund
                    )
                    SELECT
                        t.id_unidade,
                        t.nome_unidade,
                        t.id_cidade,
                        t.nome_cidade,
                        t.id_campus,
                        c.sglpticam AS nome_campus,
                        t.created_at
                    FROM
                        tabela t
                    INNER JOIN campus c ON (t.id_campus = c.numpticam AND t.id_cidade = c.codcam)
                    ")
                    
            })
        }

        return $query;
    }

    
    private function fakeInstitutoQuery()
    {
        $cidades = [10 => 'São Paulo', 20 => 'Bauru', 30 => 'Piracicaba', 40 => 'Pirassununga',
                    50 => 'São Carlos', 60 => 'Ribeirão Preto', 70 => 'Lorena',];
        $prefixos = ['Instituto', 'Centro', 'Escola', 'Faculdade', 'Serviço', 'Fundação'];
        $areas = [
            'Energia e Ambiente', 'Direito', 'Medicina', 'Saúde Pública', 'Enfermagem', 
            'Filosofia, Letras e Ciências Humanas', 'Ciências Farmacêuticas', 
            'Medicina Veterinária e Zootecnia', 'Economia', 'Astronomia e Geofísica', 
            'Arquitetura e Urbanismo e de Design', 'Odontologia', 'Agricultura', 
            'Comunicações e Artes', 'Pesquisas Matemáticas', 'Biologia Marinha', 'Geografia', 
            'Arqueologia e Etnologia', 'Zoologia', 'Educação Física e Esporte', 'Biociências', 
            'Ciências Biomédicas', 'Física', 'Geociências', 'Matemática e Estatística', 'Química', 'Psicologia', 'Educação',
            'Relações Internacionais', 'Bibliotecas e Coleções Digitais', 'Engenharia', 
        ];

        $faker = Faker::create();
        $fakeData = [];

        for ($i = 0; $i < 20; $i++) {
            $idCidade = $faker->randomElement([10, 20, 30, 40, 50, 60, 70]);
            $fakeData[] = [
                'id_institute' => $faker->numberBetween(1, 100),
                'name_institute' => $faker->randomElement($prefixos) . ' de ' . $faker->randomElement($areas),
                'id_city' => $idCidade,
                'name_city' => $cidades[$idCidade],
                'id_campus' => $faker->numberBetween(1, 5),
                'name_campus' => 'Algum campus',
                'created_at' => $faker->date(),
                //'updated_at' => now(),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['id_institute']}' as id_institute,
                           '{$row['name_institute']}' as name_institute,
                           '{$row['id_city']}' as id_city,
                           '{$row['name_city']}' as name_city,
                           '{$row['id_campus']}' as id_campus,
                           '{$row['name_campus']}' as name_campus,
                           '{$row['created_at']}' as created_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
