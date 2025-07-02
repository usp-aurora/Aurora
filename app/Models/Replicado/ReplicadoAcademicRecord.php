<?php

namespace App\Models\Replicado;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ReplicadoAcademicRecord extends Model
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
                    'coddis AS subject_code',
					'codtur AS class_code',
                    'codpgm AS program_code',
                    DB::raw("TRIM(rstfim) AS status"),
                )
                ->from('HISTESCOLARGR')
                ->whereIn('rstfim', ['A', 'D']);
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeQuery()
    {
        $letras = ['A', 'B', 'C'];
        $numeros = ['0', '1'];
        $faker = Faker::create();
        $fakeData = [];

        for ($i = 0; $i < 20; $i++) {
            $fakeData[] = [
                'nusp' => $faker->numerify('########'),
                'subject_code' => $faker->randomElement($letras) . $faker->randomElement($letras) . $faker->randomElement($letras) . '000' . $faker->randomElement($numeros),
                'class_code' => '20' . $faker->numberBetween(0, 26) . $faker->numberBetween(1, 2) . $faker->numerify('##'),
                'program_code' => $faker->numberBetween(0, 26),
                'status' => $faker->randomElement(['A', 'D']),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['nusp']}' as nusp,
                           '{$row['subject_code']}' as subject_code,
                           '{$row['class_code']}' as class_code,
                           '{$row['program_code']}' as program_code,
                           '{$row['status']}' as status";
        })->implode(' UNION ALL ');

        return $query;
    }
}
