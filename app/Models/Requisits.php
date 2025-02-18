<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

# Fechou
class Requisits extends Model
{
    protected $connection = "jupiter";
    protected $table = "dummy"; // Nosso model é baseado em uma consulta, e não em uma tabela real
    public $timestamps = false;

    public function newQuery()
    {
        if(!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeRequisitionsQuery(), 'subtable');
        }
        else{
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->select(
                    'coddis AS id_subject',
                    'verdis AS ver_subject',
                    'coddisreq AS id_subject_req',
                    'verdisreq AS ver_subject_req'
                )
                ->from('REQUISITOGR')
                ->where('codcur', '=', 45052) // Curso de Ciência da Computação
                ->where('codhab', '=', 1);   // Habilitação
            }, 'subtable');
        }

        return $query;
    }

    
    private function fakeRequisitionsQuery()
    {
        // força-bruta
        $requisitos = [
            'AAA0000' => null, 
            'AAA0001' => null, 
            'AAB0000' => ['AAA0000'],
            'AAB0001' => ['AAB0000'],
            'AAC0000' => ['AAA0001'],
            'AAC0001' => ['AAC0000'],

            'BBB0000' => null,
            'BBB0001' => null,
            'BBA0000' => ['BBB0000'],
            'BBA0001' => ['BBA0000'],
            'BBC0000' => ['BBB0001'],
            'BBC0001' => ['BBC0000'],

            'CCC0000' => null,
            'CCC0001' => null,
            'CCA0000' => ['CCC0000'],
            'CCA0001' => ['CCA0000'],
            'CCB0000' => ['CCC0001'],
            'CCB0001' => ['CCB0000'],

            'ABC0000' => ['AAB0000', 'AAC0000'],
            'ABC0001' => ['AAB0000', 'AAC0001'],
            'ABB0000' => null,
            'ABB0001' => ['AAA0000'],
            'ABA0000' => ['AAB0000', 'ABC0000'],
            'ABA0001' => ['ABC0001', 'AAC0001'],
            
            'ACC0000' => ['AAB0001'],
            'ACC0001' => null,
            'ACB0000' => ['AAB0001', 'AAC0000'],
            'ACB0001' => ['AAB0001', 'AAC0001'],
            'ACA0000' => ['AAB0001', 'ABC0000'],
            'ACA0001' => ['ABC0000', 'AAC0001'],
            
            'BAC0000' => ['BBA0000', 'BBC0000'],
            'BAC0001' => ['BBA0000', 'BBC0001'],
            'BAB0000' => ['BBA0000', 'BAC0000'],
            'BAB0001' => ['BAC0001', 'BBC0001'],
            'BAA0000' => null,
            'BAA0001' => null,

            'BCA0000' => ['BBA0001', 'BBC0000'],
            'BCA0001' => ['BBA0001', 'BBC0001'],
            'BCB0000' => ['BBA0001', 'ACB0000'],
            'BCB0001' => ['BCA0000', 'BBC0001'],
            'BCC0000' => ['BBA0000'],
            'BCC0001' => ['BBC0001'],

            'CAA0000' => null,
            'CAA0001' => null,
            'CAB0000' => ['CCA0000', 'CCB0000'],
            'CAB0001' => ['CCA0000', 'CCB0001'],
            'CAC0000' => ['CCA0000', 'CCB0000'],
            'CAC0001' => ['CCA0001', 'CCB0001'],

            'CBA0000' => ['CCA0001', 'CCB0000'],
            'CBA0001' => ['CCA0001', 'CCB0001'],
            'CBB0000' => ['CAA0000', 'ACC0000'],
            'CBB0001' => ['CAA0001', 'BAA0001'],
            'CBC0000' => ['CCA0001', 'CCB0000'],
            'CBC0001' => ['CCA0000', 'ABC0001'],
        ];
    
        $faker = Faker::create();
        $fakeData = [];
        for ($i = 0; $i < 20; $i++) {
            $subj = $faker->randomElement($requisitos);
            $fakeData[] = [
                'id_subject' => $subj,
                'ver_subject' => 1,
                'id_subject_req' => $requisitos[$subj],
                'ver_subject_req' => 1,
            ];
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['id_subject']}' as id_subject, 
                            {$row['ver_subject']} as ver_subject, 
                            '{$row['id_subject_req']}' as id_subject_req, 
                            {$row['ver_subject_req']} as ver_subject_req";
        })->implode(' UNION ALL ');

        return $query;
    }
}
