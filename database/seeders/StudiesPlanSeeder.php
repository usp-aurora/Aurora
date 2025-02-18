<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\StudiesPlan;

class StudiesPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plan = [
            'id_user' => 1,
            'subject_code' => "MAC0218",
            'semester' => 1,
        ];

        // StudiesPlan::create($plan);
        StudiesPlan::factory(45)->create();
    }
}