<?php

namespace App\Models\Replicado;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class ReplicadoCurriculum extends Model
{
    protected $connection = null;
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if(!config('services.replicado_is_active')) {
            $query = parent::newQuery()->fromSub($this->fakeQuery(), 'subtable');
        }
        else { 
            $this->connection = "replicado";
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'codcrl AS id',
                    'codcur AS major_id',
                    'codhab AS habilitation_id',
                    'duridlcur AS ideal_duration',
                    'durmaxcurusp AS max_duration',
                    'durmincurusp AS min_duration',
                )
                ->from('CURRICULOGR')
                ->whereNull('dtafimcrl')
                ->whereNotNull('dtainicrl');
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeQuery()
    {
        $faker = Faker::create();
        $fakeData = [];
        for ($i = 0; $i < 20; $i++) {
            $fakeData[] = [
                'id' => $faker->numerify('#####'),
                'major_id' => $faker->numerify('####'),
                'habilitation_id' => $faker->numerify('###'),
                'ideal_duration' => $faker->numberBetween(5, 10),
                'max_duration' => $faker->numberBetween(10, 20),
                'min_duration' => $faker->numberBetween(1, 5),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['id']}' as id, 
                            '{$row['major_id']}' as major_id,
                            '{$row['habilitation_id']}' as habilitation_id,
                            '{$row['ideal_duration']}' as ideal_duration,
                            '{$row['max_duration']}' as max_duration,
                            '{$row['min_duration']}' as min_duration";
        })->implode(' UNION ALL ');

        return $query;
    }
}
