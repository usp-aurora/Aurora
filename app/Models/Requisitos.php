<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class Requisitos extends Model
{
    protected $connection = "jupiter";
    protected $table = "dummy"; // Nosso model é baseado em uma consulta, e não em uma tabela real
    public $timestamps = false;

    public function newQuery()
    {
        if(!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeRequisitionsQuery(), 'subtable');
        }
        else{
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'coddis AS id_materia',
                    'verdis AS versao_materia',
                    'coddisreq AS id_materia_requisito',
                    'verdisreq AS versao_materia_requisito'
                )
                ->from('REQUISITOGR')
                ->where('codcur', '=', 45052) // Curso de Ciência da Computação
                ->where('codhab', '=', 1);   // Habilitação
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeRequisitionsQuery()
    {
        $faker = Faker::create();
        $fakeData = [];
        for ($i = 0; $i < 10; $i++) {
            $fakeData[] = [
                'id_materia' => "MAC" . $faker->numerify('####'),
                'versao_materia' => $faker->numberBetween(0, 3),
                'id_materia_requisito' => "MAC" . $faker->numerify('####'),
                'versao_materia_requisito' => $faker->numberBetween(0, 3),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['id_materia']}' as id_materia, 
                            {$row['versao_materia']} as versao_materia, 
                            '{$row['id_materia_requisito']}' as id_materia_requisito, 
                            {$row['versao_materia_requisito']} as versao_materia_requisito";
        })->implode(' UNION ALL ');

        return $query;
    }
}
