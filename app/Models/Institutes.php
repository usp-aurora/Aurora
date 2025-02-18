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
                $query->select(
                    'c.codcam',
                    'c.nomcam'
                )
                ->from('CAMPUS AS c')
                ->groupBy('c.codcam', 'c.nomcam');
            }, 'cidades_agrupadas');
    

            $query = $query->fromSub(function ($query) {
                $query->select(
                    'e.codund',
                    'e.numpticam'
                )
                ->from('ENDUSP AS e')
                ->selectRaw('COUNT(*) AS frequencia')
                ->selectRaw('ROW_NUMBER() OVER (PARTITION BY e.codund ORDER BY COUNT(*) DESC) AS rn')
                ->groupBy('e.codund', 'e.numpticam')
                ->havingRaw('rn = 1');
            }, 'subcampus');
    
            $query = $query->fromSub(function ($query) {
                $query->select(
                    'c.codcam',
                    'c.numpticam',
                    'c.sglpticam'
                )
                ->from('CAMPUS AS c');
            }, 'campus');

            $query = $query->fromSub(function ($query) {
                $query->select(
                    'u.codund AS id_unidade',
                    'u.nomund AS nome_unidade',
                    'ca.codcam AS id_cidade',
                    'ca.nomcam AS nome_cidade',
                    's.numpticam AS id_campus',
                    'u.dtainival AS created_at'
                )
                ->from('UNIDADE AS u')
                ->join('cidades_agrupadas AS ca', 'u.codcam', '=', 'ca.codcam')
                ->join('subcampus AS s', 'u.codund', '=', 's.codund');
            }, 'tabela');
    
            $query->join('campus AS c', function ($join) {
                $join->on('tabela.id_campus', '=', 'c.numpticam')
                     ->whereColumn('tabela.id_cidade', '=', 'c.codcam');
            });
    
            $query->select(
                'tabela.id_unidade AS id_institute',
                'tabela.nome_unidade AS name_institute',
                'tabela.id_cidade AS id_city',
                'tabela.nome_cidade AS name_city',
                'tabela.id_campus',
                'c.sglpticam AS name_campus',
                'tabela.created_at'
            );
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
