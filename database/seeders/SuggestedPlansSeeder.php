<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SuggestedPlan;

class SuggestedPlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suggested_plans = [
            [
                "semester" => 1,
                "subject_code" => "MAC0101",
            ],
            [
                "semester" => 1,
                "subject_code" => "MAC0105",
            ],
            [
                "semester" => 1,
                "subject_code" => "MAC0110",
            ],
            [
                "semester" => 1,
                "subject_code" => "MAC0329",
            ],
            [
                "semester" => 1,
                "subject_code" => "MAT2453",
            ],
            [
                "semester" => 1,
                "subject_code" => "MAT0112",
            ],
            [
                "semester" => 2,
                "subject_code" => "MAC0121",
            ],
            [
                "semester" => 2,
                "subject_code" => "MAC0216",
            ],
            [
                "semester" => 2,
                "subject_code" => "MAC0239",
            ],
            [
                "semester" => 2,
                "subject_code" => "MAE0119",
            ],
            [
                "semester" => 2,
                "subject_code" => "MAT2454",
            ],
            [
                "semester" => 2,
                "subject_code" => "MAT0122",
            ],
            [	
                "semester" => 3,
                "subject_code" => "MAC0102",
            ],
            [	
                "semester" => 3,
                "subject_code" => "MAC0209",
            ],
            [	
                "semester" => 3,
                "subject_code" => "MAC0210",
            ],
            [	
                "semester" => 3,
                "subject_code" => "MAC0323",
            ],
            [	
                "semester" => 3,
                "subject_code" => "MAT0236",
            ],
            [
                "semester" => 4,
                "subject_code" => "MAC0316",
            ],
            [
                "semester" => 4,
                "subject_code" => "MAC0338",
            ],
            [
                "semester" => 5,
                "subject_code" => "MAC0350",
            ],
            [
                "semester" => 5,
                "subject_code" => "MAC0422",
            ],
            [
                "semester" => 7,
                "subject_code" => "MAC0499",
            ]
        ];

        foreach ($suggested_plans as $suggested_plan) {
            SuggestedPlan::create($suggested_plan);
        }
    }
}
