<?php

use App\Http\Controllers\TargetTypeController;
use Illuminate\Support\Facades\Route;

Route::get('/names', [TargetTypeController::class, 'getNames']);
