<?php

use App\Http\Controllers\NadeController;
use Illuminate\Support\Facades\Route;

Route::get('/{mapId}', [NadeController::class, 'getByMapId']);
Route::post('/{mapId}', [NadeController::class, 'create']);
Route::put('/{nadeId}/name', [NadeController::class, 'updateName']);
Route::put('/{nadeId}/description', [NadeController::class, 'updateDescription']);
