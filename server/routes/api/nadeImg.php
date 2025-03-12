<?php

use App\Http\Controllers\NadeImgController;
use Illuminate\Support\Facades\Route;

Route::post('/{nadeId}', [NadeImgController::class, 'create']);
Route::delete('/{id}', [NadeImgController::class, 'delete']);
Route::put('/', [NadeImgController::class, 'replaceIndexes']);
