<?php

namespace App\Models\Replicado;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class ReplicadoHabilitation extends Model
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
                    'codhab AS id',
                    'codcur AS major_id',
                    'nomhab AS name',
                )
                ->from('HABILITACAOGR')
                ->whereNull('dtadtvhab')
                ->whereNotNull('dtaatvhab')
                ;
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
                'name' => $faker->words(3, true),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['id']}' as id, 
                            '{$row['major_id']}' as major_id,
                            '{$row['name']}' as name";
        })->implode(' UNION ALL ');

        return $query;
    }
}
