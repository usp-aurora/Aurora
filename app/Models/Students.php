<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class Students extends Model
{
    protected $connection = "jupiter";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if (!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeEstudanteQuery(), 'subtable');
        } else {
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'h.codpes AS nusp',
                    'v.codcurgrd AS id_major',
                    'h.coddis AS id_subject',
                    'h.codtur AS id_class',
                    'h.codpgm AS program',
                    DB::raw('COALESCE(h.notfim2, h.notfim) AS grade'),
                    'h.frqfim AS frequency',
                    'h.rstfim AS status_approved',
                    'h.discrl AS mandatory',
                    'h.dtacrihst AS created_at',
                    'h.dtaultalt AS updated_at'
                )
                ->from('HISTESCOLARGR AS h')
                ->join('VINCULOPESSOAUSP AS v', 'h.codpes', '=', 'v.codpes');
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeEstudanteQuery()
    {
        $letras = ['A', 'B', 'C'];
        $numeros = ['0', '1'];
        $faker = Faker::create();
        $fakeData = [];

        for ($i = 0; $i < 20; $i++) {
            $idCidade = $faker->randomElement([10, 20, 30, 40, 50, 60, 70]);
            $fakeData[] = [
                'nusp' => $faker->numerify('########'),
                'id_subject' => $faker->randomElement($letras) . $faker->randomElement($letras) . $faker->randomElement($letras) . '000' . $faker->randomElement($numeros),
                'id_class' => '201' . $faker->numberBetween(0, 26) . $faker->numerify('####'),
                'program' => $faker->numberBetween(1, 3),
                'grade' => $faker->numberBetween(0, 10),
                'frequency' => $faker->numberBetween(0, 100),
                'status_approved' => $faker->randomElement(['A', 'NP', 'NF']),
                'mandatory' => $faker->randomElement(['O', 'C', 'L']),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['nusp']}' as nusp,
                           '{$row['id_subject']}' as id_subject,
                           '{$row['id_class']}' as id_class,
                           '{$row['program']}' as program,
                           '{$row['grade']}' as grade,
                           '{$row['frequency']}' as frequency,
                           '{$row['status_approved']}' as status_approved,
                           '{$row['mandatory']}' as mandatory,
                           '{$row['created_at']}' as created_at
                           '{$row['updated_at']}' as updated_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
