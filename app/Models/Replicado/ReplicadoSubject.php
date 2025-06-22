<?php

namespace App\Models\Replicado;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ReplicadoSubject extends Model
{
    protected $connection = null;
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {   
        if(!config('services.replicado_is_active')){
            $query = parent::newQuery()->fromSub($this->fakeQuery(), 'subtable');
        }
        else{
            $this->connection = "replicado"; 
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'coddis AS code',
                    'nomdis AS name',
                    'objdis AS syllabus',
                    'creaul AS lecture_credits',
                    'cretrb AS work_credits',
                )
                ->whereNull('dtadtvdis')
                ->whereNotNull('dtaatvdis')
                ->from('DISCIPLINAGR');
            }, 'dummy');
        }

        return $query;
    }

    
    private function fakeQuery()
    {
        $letras = ['A', 'B', 'C'];
        $numeros = ['0', '1'];
        $faker = Faker::create();
        $fakeData = [];
        for($i = 0; $i < 3; $i++){
            for($j = 0; $j < 3; $j++){
                for($k = 0; $k < 3; $k++){
                    for($l = 0; $l < 2; $l++){
                        $fakeData[] = [
                            'code' => $letras[$i] . $letras[$j] . $letras[$k] . '000' . $numeros[$l],
                            'name' => $faker->word,
                            'syllabus' => $faker->paragraph(5),
                            'lecture_credits' => 4,
                            'work_credits' => 2
                        ];
                    }
                }
            }   
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['code']}' as code,
                            '{$row['name']}' as name,
                            '{$row['syllabus']}' as syllabus,
                            '{$row['lecture_credits']}' as lecture_credits,
                            '{$row['work_credits']}' as work_credits
                            ";
        })->implode(' UNION ALL ');

        return $query;
    }
}