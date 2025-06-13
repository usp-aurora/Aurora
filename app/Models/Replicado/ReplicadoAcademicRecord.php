<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class ReplicadoAcademicRecord extends Model
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
                    'h.codpes AS nusp',
                    'h.coddis AS subject_code',
					'h.codtur AS class_code',
                )
                ->from('HISTESCOLARGR AS h')
				->where('h.rstfim', '=', 'A');
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
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['nusp']}' as nusp,
                           '{$row['subject_code']}' as subject_code,
                           '{$row['class_code']}' as class_code";
        })->implode(' UNION ALL ');

        return $query;
    }
}
