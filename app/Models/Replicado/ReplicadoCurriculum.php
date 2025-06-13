<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ReplicadoCurriculum extends Model
{
    protected $connection = "replicado";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if(!config('services.replicado_is_active')) {
            $query = parent::newQuery()->fromSub($this->fakeCurriculosQuery(), 'subtable');
        }
        else {
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'g.codcrl AS id',
                    'g.coddis AS subject_id',
                    'g.numsemidl AS ideal_period',
                    'g.tipobg AS mandatory',
                    'g.dtacad AS created_at',
                    'g.dtaultalt AS updated_at',
                    'g.verdis',
                    DB::raw('FIRST_VALUE(g.verdis) OVER (PARTITION BY g.coddis, g.codcrl ORDER BY g.verdis DESC) AS most_recent_version')
                )
                ->from('GRADECURRICULAR AS g');
            }, 'subtable');

            $query->whereRaw('subtable.verdis = subtable.most_recent_version');
        }
        
        return $query;
    }

    
    private function fakeCurriculosQuery()
    {
        $letras = ['A', 'B', 'C'];
        $numeros = ['0', '1'];
        $faker = Faker::create();
        $fakeData = [];
        for ($i = 0; $i < 20; $i++) {
            $curri = $faker->numerify('#####');
            $habi = $faker->numerify('####');
            $fakeData[] = [
                'id' => $curri . $habi . $faker->numerify('###'),
                'subject_id' => $faker->randomElement($letras) . $faker->randomElement($letras) . $faker->randomElement($letras) . '000' . $faker->randomElement($numeros),
                'ideal_period' => $faker->numberBetween(1,9),
                'mandatory' => $faker->randomElement(['O', 'C', 'L']),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['id']}' as id, 
                            '{$row['subject_id']}' as subject_id, 
                            '{$row['ideal_period']}' as ideal_period, 
                            '{$row['mandatory']}' as mandatory, 
                            '{$row['created_at']}' as created_at, 
                            '{$row['updated_at']}' as updated_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
