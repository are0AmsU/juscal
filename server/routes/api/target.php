<?php

use App\Http\Controllers\TargetController;
use Illuminate\Support\Facades\Route;

Route::get('/{mapId}', [TargetController::class, 'getByMapId']);
Route::post('/{mapId}', [TargetController::class, 'create']);
Route::delete('/{id}', [TargetController::class, 'delete']);
Route::put('/{id}/type', [TargetController::class, 'updateType']);
Route::put('/{id}/coordinates', [TargetController::class, 'updateCoordinates']);
