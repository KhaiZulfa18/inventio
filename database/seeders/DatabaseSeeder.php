<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Price;
use App\Models\Supplier;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionTableSeeder::class);

        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin1234'),
        ]);

        $user->assignRole('super-admin');

        Category::factory()
                ->count(6)
                ->has(Product::factory()->
                    count(7)->has(Price::factory()
                        ->count(1)->state([
                            'price_type' => 1,
                        ])
                    )->has(Price::factory()
                        ->count(1)->state([
                            'price_type' => 2,
                        ])
                    )
                )
                ->create();

        Supplier::factory()
                ->count(8)
                ->create();

        Customer::factory()
                ->count(5)
                ->create();
    }
}
