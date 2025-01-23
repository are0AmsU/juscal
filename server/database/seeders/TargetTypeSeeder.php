<?php

namespace Database\Seeders;

use App\Models\TargetType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TargetTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        TargetType::create([
            'name' => 'flash',
            'icon' => 'storage/icons/flash.svg'
        ]);

        TargetType::create([
            'name' => 'hae',
            'icon' => 'storage/icons/hae.svg'
        ]);

        TargetType::create([
            'name' => 'molotov',
            'icon' => 'storage/icons/molotov.svg'
        ]);

        TargetType::create([
            'name' => 'smoke',
            'icon' => 'storage/icons/smoke.svg'
        ]);
    }
}
