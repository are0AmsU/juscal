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
            'icon' => 'icons/flash.svg'
        ]);

        TargetType::create([
            'name' => 'hae',
            'icon' => 'icons/hae.svg'
        ]);

        TargetType::create([
            'name' => 'molotov',
            'icon' => 'icons/molotov.svg'
        ]);

        TargetType::create([
            'name' => 'smoke',
            'icon' => 'icons/smoke.svg'
        ]);
    }
}
