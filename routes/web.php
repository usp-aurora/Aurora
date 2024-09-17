<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlansController;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/test', [PlansController::class, 'test']);
Route::resource('/plans', PlansController::class);