<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\MateriaSeeder;
use Database\Seeders\PlanoEstudosSeeder;
use Database\Seeders\MateriasGrupoSeeder;
use Database\Seeders\CriteriosCompletudeSeeder;
use Database\Seeders\GrupoSeeder;
use Database\Seeders\CursosSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Teste',
            'email' => 'teste@teste.com',
            'codpes' => '12345678'
        ]);

        $this->call([
            GrupoSeeder::class,
            MateriaSeeder::class,
            PlanoEstudosSeeder::class,
            MateriasGrupoSeeder::class,
            CriteriosCompletudeSeeder::class,
            CursosSeeder::class
        ]);
    }
}
