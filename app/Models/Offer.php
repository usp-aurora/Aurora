<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class Offer extends Model
{
    protected $connection = "jupiter";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if(!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeOferecimentosQuery(), 'subtable');
        }
        else{
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    't.codtur AS id_class',
                    'd.nompes AS professor',
                    't.cgahorteo AS hours_theory',
                    't.cgahorpra AS hours_practice',
                    'p.horent AS hours_start',
                    'p.horsai AS hours_end',
                    'mi.diasmnocp AS weekday_occ',
                    'mi.dtainiaul as day_start',
	                'mi.dtafimaul as day_end',
                    't.coddis AS id_subject'
                )
                ->from('TURMAGR t')
                ->join('MINISTRANTE mi', 'mi.codtur', '=', 't.codtur')
                ->join('VINCULOPESSOAUSP d', 'd.codpes', '=', 'mi.codpes')
                ->join('PERIODOHORARIO p', 'mi.codperhor', '=', 'p.codperhor');
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeOferecimentosQuery()
    {
        $letras = ['A', 'B', 'C'];
        $numeros = ['0', '1'];
        $faker = Faker::create();
        $fakeData = [];
        for ($i = 0; $i < 20; $i++) {
            $fakeData[] = [
                'id_class' => '201' . $faker->numberBetween(0, 26) . $faker->numerify('####'),
                'professor' => $faker->name(),
                'hours_theory' => $faker->numberBetween(10, 100),
                'hours_practice' => $faker->numberBetween(10, 50),
                'hours_start' => $faker->time('H:i'),
                'hours_end' => $faker->time('H:i'),
                'weekday_occ' => $faker->randomElement(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']),
                'day_start' => $faker->date(),
                'day_end' => $faker->date(),
                'id_subject' => $faker->randomElement($letras) . $faker->randomElement($letras) . $faker->randomElement($letras) . '000' . $faker->randomElement($numeros),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['id_class']}' as id_class,
                           '{$row['professor']}' as professor,
                           '{$row['hours_theory']}' as hours_theory,
                           '{$row['hours_practice']}' as hours_practice,
                           '{$row['hours_start']}' as hours_start,
                           '{$row['hours_end']}' as hours_end,
                           '{$row['weekday_occ']}' as weekday_occ,
                           '{$row['day_start']}' as day_start,
                           '{$row['day_end']}' as day_end,
                           '{$row['id_subject']}' as id_subject";
        })->implode(' UNION ALL ');

        return $query;
    }
}
