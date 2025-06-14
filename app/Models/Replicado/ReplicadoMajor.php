<?php

namespace App\Models\Replicado;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class ReplicadoMajor extends Model
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
                    'codcur AS major_id',
                    'nomcur AS major_name',
                    'codclg AS collegiate_id',
                )
                ->from('CURSOGR');
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
                'major_id' => $faker->numerify('#####'),
                'major_name' => $faker->words(3, true),
                'collegiate_id' => $faker->numerify('###'),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['major_id']}' as major_id, 
                            '{$row['major_name']}' as major_name,
                            '{$row['collegiate_id']}' as collegiate_id";
        })->implode(' UNION ALL ');

        return $query;
    }
}
