<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\PlanoEstudos;

class PlanoEstudosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plan = [
            'id_usuario' => 1,
            'codigo_materia' => "MAC0218",
            'semestre' => 1,
        ];

        // PlanoEstudos::create($plan);
        PlanoEstudos::factory(45)->create();
    }
}