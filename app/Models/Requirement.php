<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class Requirement extends Model
{
    protected $table = "dummy"; // Nosso model é baseado em uma consulta, e não em uma tabela real
    public $timestamps = false;

    public function newQuery()
    {
        if (!env('JUPITER_DB_HOST')) {
            $query = parent::newQuery()->fromSub($this->fakeRequisitionsQuery(), 'subtable');
        } else {
            $this->connection = "jupiter";
            $query = parent::newQuery()->fromSub(function ($query) {
                $query->selectRaw("
                    coddis AS subject_code,
                    coddisreq AS required_subject_code
                ")
                    ->fromSub(function ($subQuery) {
                        $subQuery->selectRaw("
                            coddis,
                            verdis,
                            coddisreq,
                            verdisreq,
                            DENSE_RANK() OVER (
                                PARTITION BY coddis
                                ORDER BY verdis DESC
                            ) AS subject_version_rank,
                            DENSE_RANK() OVER (
                                PARTITION BY coddis, verdis, coddisreq
                                ORDER BY verdisreq DESC
                            ) AS requisition_version_rank,
                            RANK() OVER (
                                PARTITION BY coddis, verdis
                                ORDER BY numgrpreq DESC 
                            ) AS group_rank
                        ")
                            ->from('REQUISITOGR')
                            ->where('codcur', '=', 45052) // Curso de Ciência da Computação
                            ->where('codhab', '=', 1);
                    }, 'subquery')
                    ->where('subquery.subject_version_rank', '=', 1)
                    ->where('subquery.requisition_version_rank', '=', 1)
                    ->where('subquery.group_rank', '=', 1);
            }, 'dummy');
        }

        return $query;
    }


    private function fakeRequisitionsQuery()
    {
        $fakeRequirements = [
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

        $fakeData = [];
        for ($i = 0; $i < count($fakeRequirements); $i++) {
            $subject_code = array_keys($fakeRequirements)[$i];
            $requirements = $fakeRequirements[$subject_code];

            if (is_array($requirements)) {
                foreach ($requirements as $requirement) {
                    $fakeData[] = [
                        'subject_code' => $subject_code,
                        // 'subject_version' => 1,
                        'required_subject_code' => $requirement,
                        // 'required_subject_version' => 1,
                    ];
                }
            }
        }

        $query = collect($fakeData)->map(function ($row) {
            return "SELECT  '{$row['subject_code']}' as subject_code, 
                            '{$row['required_subject_code']}' as required_subject_code
                            ";
        })->implode(' UNION ALL ');

        return $query;
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_code', 'code');
    }

    public function requiredSubject()
    {
        return $this->belongsTo(Subject::class, 'required_subject_code', 'code');
    }
}
