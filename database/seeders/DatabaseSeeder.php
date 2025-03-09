<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\SubjectSeeder;
use Database\Seeders\PlanSeeder;
use Database\Seeders\RoleAndPermissionSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleAndPermissionSeeder::class
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'codpes' => 999999999
        ]);

        $this->call([
            SubjectSeeder::class,
            PlanSeeder::class,
            RoleAndPermissionSeeder::class
        ]);

    }
}
