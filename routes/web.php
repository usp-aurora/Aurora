<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\PlanController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\LoginController;

Route::get('/', [HomeController::class, 'index']);

Route::middleware('auth')->prefix('api/plans')->group(function () {
    Route::get('/index', [PlanController::class, 'index']);
    Route::post('/sync', [PlanController::class, 'sync']);
    // Route::post('', [PlanController::class, 'store']);
    // Route::put('/{id}', [PlanController::class, 'update']);
    // Route::delete('/{id}', [PlanController::class, 'destroy']);
});

Route::get('/api/user', function () {
    return response()->json(Auth::user());
});

Route::get('/teste-login', [IndexController::class, 'index']);
Route::get('login', [LoginController::class, 'redirectToProvider']);
Route::get('callback', [LoginController::class, 'handleProviderCallback']);
Route::get('logout', [LoginController::class, 'logout']);
