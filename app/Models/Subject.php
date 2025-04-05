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
                    'coddis AS code',
                    'nomdis AS name',
                )
                ->whereNull('dtadtvdis')
                ->whereNotNull('dtaatvdis')
                ->from('DISCIPLINAGR');
            }, 'dummy');
        }

        return $query;
    }

    
    private function fakeMateriasQuery()
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
                        ];
                    }
                }
            }   
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['code']}' as code,
                            '{$row['name']}' as name
                            ";
        })->implode(' UNION ALL ');

        return $query;
    }

    public function requirements()
    {
        return $this->hasMany(Requirement::class, 'subject_code', 'code');
    } 
}
