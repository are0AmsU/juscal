<?php

use App\Http\Controllers\NadeTargetController;
use Illuminate\Support\Facades\Route;

Route::post('/', [NadeTargetController::class, 'create']);
