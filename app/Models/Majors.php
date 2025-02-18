<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

# Fechou.
class Majors extends Model
{
    protected $connection = "jupiter";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if(!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeCurriculosQuery(), 'subtable');
        }
        else {
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'c.codcrl AS id_curriculum',
                    'c.codcur AS id_major',
                    'cg.nomcur AS name_major',
                    'c.codhab AS id_hab',
                    'c.duridlcur AS periods_ideal',
                    'c.durmaxcurusp AS periods_max',
                    'c.durmincurusp AS periods_min',
                    'c.dtafimcrl AS deact_curriculum',
                    'cg.dtadtvcur AS deact_major',
                    'c.dtacad AS created_at',
                    'c.dtaultalt AS updated_at'
                )
                ->from('CURRICULOGR AS c')
                ->join('CURSOGR AS cg', 'cg.codcur', '=', 'c.codcur');
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeCurriculosQuery()
    {
        $faker = Faker::create();
        $fakeData = [];
        for ($i = 0; $i < 20; $i++) {
            $curri = $faker->numerify('#####');
            $habi = $faker->numerify('####');
            $fakeData[] = [
                'id_curriculum' => $curri . $habi . $faker->numerify('###'),
                'id_major' => $curri,
                'name_major' => $faker->word(),
                'id_hab' => $habi,
                'periods_ideal' => $faker->numberBetween(5,7),
                'periods_max' => $faker->numberBetween(7,9),
                'periods_min' => $faker->numberBetween(3,5),
                'deact_curriculum' => $faker->date(),
                'deact_major' => $faker->date(),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['id_curriculum']}' as id_curriculum, 
                            '{$row['id_major']}' as id_major, 
                            '{$row['name_major']}' as name_major, 
                            '{$row['id_hab']}' as id_hab, 
                            '{$row['periods_ideal']}' as periods_ideal, 
                            '{$row['periods_max']}' as periods_max, 
                            '{$row['periods_min']}' as periods_min, 
                            '{$row['deact_curriculum']}' as deact_curriculum, 
                            '{$row['deact_major']}' as deact_major, 
                            '{$row['created_at']}' as created_at, 
                            '{$row['updated_at']}' as updated_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
