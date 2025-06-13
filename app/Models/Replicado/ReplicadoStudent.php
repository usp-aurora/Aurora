<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ReplicadoStudent extends Model
{
    protected $connection = "replicado";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if (!config('services.replicado_is_active')) {
            $query = parent::newQuery()->fromSub($this->fakeQuery(), 'subtable');
        } else {
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'v.codpes AS nusp',
                    'v.codcurgrd AS major_id',
                    'v.codhab AS habilitation_id',
                    'v.nompes AS name',
                )
                ->from('VINCULOPESSOAUSP AS v')
                ->where('v.tipvin', '=', 'ALUNOGR')
                ->whereNotNull('v.codcurgrd');
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
