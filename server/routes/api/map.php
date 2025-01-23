<?php

use App\Http\Controllers\MapController;
use Illuminate\Support\Facades\Route;

Route::get('/{id}', [MapController::class, 'getById']);
Route::get('/', [MapController::class, 'get']);
Route::post('/', [MapController::class, 'create']);
Route::delete('/{id}', [MapController::class, 'delete']);
