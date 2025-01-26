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
            'name' => 'Test User',
            'codpes' => 14586560,
            'email' => 'test@example.com',
        ]);

        $this->call([
            MateriaSeeder::class,
            PlanoEstudosSeeder::class,
            GrupoSeeder::class,
            MateriasGrupoSeeder::class,
            CriteriosCompletudeSeeder::class,
            CursosSeeder::class
        ]);
    }
}
