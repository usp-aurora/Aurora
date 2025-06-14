<?php

namespace App\Models\Replicado;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ReplicadoStudent extends Model
{
    protected $connection = null;
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if (!config('services.replicado_is_active')) {
            $query = parent::newQuery()->fromSub($this->fakeQuery(), 'subtable');
        } else {
            $this->connection = "replicado";
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'codpes AS nusp',
                    'codcurgrd AS major_id',
                    'codhab AS habilitation_id',
                    'nompes AS name',
                )
                ->from('VINCULOPESSOAUSP')
                ->where('tipvin', '=', 'ALUNOGR')
                ->whereNotNull('codcurgrd')
                ->whereNotNull('codhab');
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
                'nusp' => $faker->numerify('########'),
                'major_id' => $faker->numerify('#####'),
                'habilitation_id' => $faker->numberBetween(0, 2),
                'name' => str_replace("'", "", $faker->name())
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['nusp']}' as nusp,
                           '{$row['major_id']}' as major_id,
                            '{$row['habilitation_id']}' as habilitation_id,
                            '{$row['name']}' as name";
        })->implode(' UNION ALL ');

        return $query;
    }
}
