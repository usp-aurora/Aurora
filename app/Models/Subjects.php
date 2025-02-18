<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

# Fechou
class Subjects extends Model
{
    protected $connection = "jupiter";
    protected $table = "dummy";
    public $timestamps = false;

    public function newQuery()
    {
        if(!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeMateriasQuery(), 'subtable');
        }
        else{
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'd.coddis AS id_subject',
                    'd.nomdis AS name_subject',
                    'd.pgmdis AS description_subject',
                    'd.creaul AS class_credits',
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
        for ($i = 0; $i < 20; $i++) {
            $fakeData[] = [
                'id_subject' => $faker->randomElement($letras) . $faker->randomElement($letras) . $faker->randomElement($letras) . '000' . $faker->randomElement($numeros),
                'name_subject' => $faker->word,
                'description_subject' => $faker->sentence,
                'class_credits' => $faker->randomNumber(2),
                'work_credits' => $faker->randomNumber(2),
                'hours_internship' => $faker->randomNumber(2),
                'hours_lic' => $faker->randomNumber(2),
                'created_at' => $faker->date(),
                'updated_at' => $faker->date(),
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT '{$row['id_subject']}' as id_subject,
                            '{$row['name_subject']}' as name_subject,
                            '{$row['description_subject']}' as description_subject,
                            {$row['class_credits']} as class_credits,
                            {$row['work_credits']} as work_credits,
                            {$row['hours_internship']} as hours_internship,
                            {$row['hours_lic']} as hours_lic,
                            '{$row['created_at']}' as created_at,
                            '{$row['updated_at']}' as updated_at";
        })->implode(' UNION ALL ');

        return $query;
    }
}
