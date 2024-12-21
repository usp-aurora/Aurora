<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\SubjectSeeder;
use Database\Seeders\PlanSeeder;

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
            SubjectSeeder::class,
            PlanSeeder::class
        ]);
    }
}
