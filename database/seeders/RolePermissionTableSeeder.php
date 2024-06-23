<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $all_access = [
            'view',
            'create',
            'update',
            'delete',
        ];
    
        $modules = [
            'user',
            'role',
            'permission',
            'category',
            'product',
        ];
        
        $permissions = ['dashboard'];
    
        foreach ($modules as $module) {
            foreach ($all_access as $access) {
                $permissions[] = "$module-$access";
            }
        }
        foreach ($permissions as $perm) {
            Permission::create(['name' => $perm]);
        }

        $roles = Role::create(['name' => 'super-admin']);

        $roles->givePermissionTo(Permission::all());
    }
}
