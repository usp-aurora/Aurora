<?php

namespace Database\Seeders;

use App\Enums\RoleName;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   

        // $roles = ['Aluno', 'Professor', 'admin'];

        $roleNames = [RoleName::STUDENT, RoleName::PROFESSOR, RoleName::ADMIN];
        foreach ($roleNames as $roleName) {
            if (!Role::where('name', $roleName)->exists()) {
                Role::create(['name' => $roleName]);
            }
        } 

        Permission::create(['name' => 'admin']);
    }
}
