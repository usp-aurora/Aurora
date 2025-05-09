<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\SubjectsSeeder;
use Database\Seeders\SuggestedPlansSeeder;
use Database\Seeders\PlansSeeder;
use Database\Seeders\GroupSubjectsSeeder;
use Database\Seeders\CompletionRequirementsSeeder;
use Database\Seeders\GroupsSeeder;
use Database\Seeders\CoursesSeeder;
use Database\Seeders\CurriculumsSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Teste',
            'email' => 'teste@teste.com',
            'codpes' => '12345678'
        ]);

        $this->call([
            GroupsSeeder::class,
            SubjectsSeeder::class,
            SuggestedPlansSeeder::class,
            PlansSeeder::class,
            GroupSubjectsSeeder::class,
            CompletionRequirementsSeeder::class,
            CoursesSeeder::class,
            CurriculumsSeeder::class
        ]);
    }
}