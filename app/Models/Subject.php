<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class Subject extends Model
{
    protected $connection = null;
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if(!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeMateriasQuery(), 'subtable');
        }
        else{
            $this->connection = "jupiter"; 
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'd.coddis AS code',
                    'd.nomdis AS name',
                    'd.verdis AS version', 
                    'd.pgmdis AS syllabus',
                    'd.creaul AS lecture_credits',
                    'd.cretrb AS work_credits',
                    'd.cgahoreto AS hours_internship',
                    'd.cgahorlcn AS hours_lic',
                    'd.dtacad AS created_at',
                    'd.dtaultalt AS updated_at'
                )
                ->from('DISCIPLINAGR d');
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeMateriasQuery()
    {
        $letras = ['A', 'B', 'C'];
        $numeros = ['0', '1'];
        $faker = Faker::create();
        $fakeData = [];
        $fakeData[] = [
            'code' => 'ABC001',
            'name' => 'Mathematics',
            'version' => 1,
            'syllabus' => 'Introduction to Mathematics',
            'lecture_credits' => 3,
            'work_credits' => 2,
            'hours_internship' => 10,
            'hours_lic' => 5,
            'created_at' => '2023-01-01',
            'updated_at' => '2023-01-02',
        ];
        for($i = 0; $i < 3; $i++){
            for($j = 0; $j < 3; $j++){
                for($k = 0; $k < 3; $k++){
                    for($l = 0; $l < 2; $l++){
                        $fakeData[] = [
                            'code' => $letras[$i] . $letras[$j] . $letras[$k] . '000' . $numeros[$l],
                            'name' => $faker->word,
                            'version' => 1,
                            'syllabus' => $faker->sentence,
                            'lecture_credits' => $faker->randomNumber(2),
                            'work_credits' => $faker->randomNumber(2),
                            'hours_internship' => $faker->randomNumber(2),
                            'hours_lic' => $faker->randomNumber(2),
                            'created_at' => $faker->date(),
                            'updated_at' => $faker->date(),
                        ];
                    }
                }
            }   
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['code']}' as code,
                            '{$row['name']}' as name,
                            '{$row['version']}' as version,
                            '{$row['syllabus']}' as syllabus,
                            {$row['lecture_credits']} as lecture_credits,
                            {$row['work_credits']} as work_credits,
                            {$row['hours_internship']} as hours_internship,
                            {$row['hours_lic']} as hours_lic,
                            '{$row['created_at']}' as created_at,
                            '{$row['updated_at']}' as updated_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
