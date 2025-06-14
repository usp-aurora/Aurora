<?php

namespace App\Models\Replicado;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ReplicadoCurriculumSubject extends Model
{
    protected $connection = "replicado";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if(!config('services.replicado_is_active')) {
            $query = parent::newQuery()->fromSub($this->fakeQuery(), 'subtable');
        }
        else {
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'codcrl AS curriculum_id',
                    'coddis AS subject_id',
                    'numsemidl AS ideal_period',
                    'tipobg AS mandatory',
                    'dtacad AS created_at',
                    'dtaultalt AS updated_at',
                )
                ->from('GRADECURRICULAR');
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
            $curri = $faker->numerify('#####');
            $habi = $faker->numerify('####');
            $fakeData[] = [
                'curriculum_id' => $curri . $habi . $faker->numerify('###'),
                'subject_id' => $faker->randomElement($letras) . $faker->randomElement($letras) . $faker->randomElement($letras) . '000' . $faker->randomElement($numeros),
                'ideal_period' => $faker->numberBetween(1,9),
                'mandatory' => $faker->randomElement(['O', 'C', 'L']),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['curriculum_id']}' as curriculum_id, 
                            '{$row['subject_id']}' as subject_id, 
                            '{$row['ideal_period']}' as ideal_period, 
                            '{$row['mandatory']}' as mandatory, 
                            '{$row['created_at']}' as created_at, 
                            '{$row['updated_at']}' as updated_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
