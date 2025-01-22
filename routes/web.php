<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PlanController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\LoginController;



Route::get('/', [HomeController::class, 'index']);

Route::prefix('api/plans')->group(function () {
    Route::get('/index', [PlanController::class, 'index']);
    Route::post('/sync', [PlanController::class, 'sync']);
    Route::post('', [PlanController::class, 'store'])->middleware('auth');
    Route::put('/{id}', [PlanController::class, 'update'])->middleware('auth');
    Route::delete('/{id}', [PlanController::class, 'destroy'])->middleware('auth');
});

Route::get('/teste-login', [IndexController::class, 'index']);
Route::get('login', [LoginController::class, 'redirectToProvider']);
Route::get('callback', [LoginController::class, 'handleProviderCallback']);
Route::get('logout', [LoginController::class, 'logout']);


// Routing para as páginas que estamos utilizando pra desenvolvimento
// !!! Lembre que apenas os arquivos em resources/js/Pages são acessíveis aqui !!!
Route::get('/test', function() {
    return Inertia::render('Development/Teste');
});

Route::get('/pokemon-card', function () {
    return Inertia::render('Development/PokemonCard');
});

Route::get('/completion-bar', function () {
    return Inertia::render('Development/TestCompletionBar');
});

Route::get('/botao', function () {
    return Inertia::render('Development/TestButtons');
});