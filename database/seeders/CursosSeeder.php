<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cursos;


class CursosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cursos::create([
            "id" => 1,
            "nome_curso" => "Ciência da Computação",
            "id_instituto" => 1,
            "grade" => 1,
            "updated_at" => "2024-08-04 19:48:30",
            "created_at" => "2024-08-04 19:48:30"
        ]);
    }
}
 