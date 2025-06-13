<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class ReplicadoMajor extends Model
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
            // Curriculo = curriculum
            // Curso = major
            // Grade curricular = curriculumSubjects
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'cg.codcur AS major_id',
                    'cg.nomcur AS major_name',
                    'c.codcrl AS curriculum_id',
                    'u.codund AS institute_id',
                    'c.codhab AS habilitation_id',
                    'c.duridlcur AS ideal_duration',
                    'c.durmaxcurusp AS max_duration',
                    'c.durmincurusp AS min_duration',
                    'c.dtafimcrl AS curriculum_deactivation_date',
                    'cg.dtadtvcur AS major_deactivation_date',
                    'c.dtacad AS created_at',
                    'c.dtaultalt AS updated_at'
                )
                ->from('CURRICULOGR AS c')
                ->join('CURSOGR AS cg', 'cg.codcur', '=', 'c.codcur')
                ->join('COLEGIADO AS cl', function ($join) {$join->on('cg.sglclg', '=', 'cl.sglclg')->on('cg.codclg', '=', 'cl.codclg');})
                ->join('UNIDADE AS u', 'cl.nomclg', '=', 'u.nomund');
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeCurriculosQuery()
    {
        $faker = Faker::create();
        $fakeData = [];
        for ($i = 0; $i < 20; $i++) {
            $major = $faker->numerify('#####');
            $habilitation = $faker->numerify('####');
            $fakeData[] = [
                'major_id' => $major,
                'major_name' => $faker->word(),
                'curriculum_id' => $major . $habilitation . $faker->numerify('###'),
                'institute_id' => $faker->numberBetween(1, 100),
                'habilitation_id' => $habilitation,
                'ideal_duration' => $faker->numberBetween(5,7),
                'max_duration' => $faker->numberBetween(7,9),
                'min_duration' => $faker->numberBetween(3,5),
                'curriculum_deactivation_date' => $faker->date(),
                'major_deactivation_date' => $faker->date(),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['major_id']}' as major_id, 
                            '{$row['major_name']}' as major_name,
                            '{$row['curriculum_id']}' as curriculum_id, 
                            '{$row['institute_id']}' as institute_id, 
                            '{$row['habilitation_id']}' as habilitation_id, 
                            '{$row['ideal_duration']}' as ideal_duration, 
                            '{$row['max_duration']}' as max_duration, 
                            '{$row['min_duration']}' as min_duration, 
                            '{$row['curriculum_deactivation_date']}' as curriculum_deactivation_date, 
                            '{$row['major_deactivation_date']}' as major_deactivation_date, 
                            '{$row['created_at']}' as created_at, 
                            '{$row['updated_at']}' as updated_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
