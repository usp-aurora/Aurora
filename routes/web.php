<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\LoginController;


Route::get('/', function () {
  return Inertia::render('Home');
});
Route::get('/teste-login', [IndexController::class, 'index']);
Route::get('login', [LoginController::class, 'redirectToProvider']);
Route::get('callback', [LoginController::class, 'handleProviderCallback']);
Route::get('logout', [LoginController::class, 'logout']);


Route::get('/test', [PlansController::class, 'test']);
