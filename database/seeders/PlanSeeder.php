<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plan = [
            'user_id' => 1,
            'subject_id' => 1,
            'semester' => 1
        ];
        Plan::create($plan);
        Plan::factory(150)->create();
    }
}
