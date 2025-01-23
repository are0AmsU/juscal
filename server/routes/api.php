<?php

use Illuminate\Support\Facades\Route;

Route::prefix('map')->group(base_path('routes/api/map.php'));
Route::prefix('target')->group(base_path('routes/api/target.php'));
Route::prefix('nade')->group(base_path('routes/api/nade.php'));
Route::prefix('target-type')->group(base_path('routes/api/targetType.php'));
Route::prefix('nade-target')->group(base_path('routes/api/nadeTarget.php'));
Route::prefix('nade-img')->group(base_path('routes/api/nadeImg.php'));
