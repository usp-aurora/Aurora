<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Plan;

class PlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plan = [
            'semester' => 1,
            'subject_code' => "MAC0110",
            'user_id' => 1,
        ];

        // Plan::create($plan);
        Plan::factory(45)->create();
    }
}
