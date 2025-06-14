<?php

namespace App\Models\Replicado;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class ReplicadoSubjectOffering extends Model
{
    protected $connection = null;
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if(!config('services.replicado_is_active')) {
            $query = parent::newQuery()->fromSub($this->fakeQuery(), 'subtable');
        }
        else{
            $this->connection = "replicado";
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    't.codtur AS id',
                    'v.nompes AS professor',
                    'p.horent AS start_time',
                    'p.horsai AS end_time',
                    'mi.diasmnocp AS weekday_occ',
                    'mi.dtainiaul AS start_day',
	                'mi.dtafimaul AS end_day',
                    't.coddis AS subject_code'
                )
                ->from('TURMAGR AS t')
                ->join('MINISTRANTE AS mi', 'mi.codtur', '=', 't.codtur')
                ->join('VINCULOPESSOAUSP AS v', 'v.codpes', '=', 'mi.codpes')
                ->join('PERIODOHORARIO AS p', 'mi.codperhor', '=', 'p.codperhor');
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeQuery()
    {
        $letras = ['A', 'B', 'C'];
        $numeros = ['0', '1'];
        $faker = Faker::create();
        $startDay = $faker->date();
        $endDay = $faker->dateTimeBetween($startDay, '+1 year')->format('Y-m-d');
        $fakeData = [];
        for ($i = 0; $i < 20; $i++) {
            $fakeData[] = [
                'id' => '201' . $faker->numberBetween(0, 26) . $faker->numerify('####'),
                'professor' =>  str_replace("'", "", $faker->name()),
                'start_time' => $faker->time('H:i'),
                'end_time' => $faker->time('H:i'),
                'weekday_occ' => $faker->randomElement(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']),
                'start_day' => $startDay,
                'end_day' => $endDay,
                'subject_code' => $faker->randomElement($letras) . $faker->randomElement($letras) . $faker->randomElement($letras) . '000' . $faker->randomElement($numeros),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['id']}' as id,
                           '{$row['professor']}' as professor,
                           '{$row['start_time']}' as start_time,
                           '{$row['end_time']}' as end_time,
                           '{$row['weekday_occ']}' as weekday_occ,
                           '{$row['start_day']}' as start_day,
                           '{$row['end_day']}' as end_day,
                           '{$row['subject_code']}' as subject_code";
        })->implode(' UNION ALL ');

        return $query;
    }
}
