<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Curriculum;

class CurriculumsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Curriculum::create([
            "id" => 1,
            "course_id" => 1,
            "group_id" => 1,
            "updated_at" => "2024-08-04 19:48:30",
            "created_at" => "2024-08-04 19:48:30"
        ]);
    }
}
