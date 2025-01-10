<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PlansController;
use App\Http\Controllers\HomeController;


Route::get('/', [HomeController::class, 'index']);

Route::prefix('api/plans')->group(function () {
    Route::get('/index', [PlansController::class, 'index'])->name('plans.index');
    Route::post('/sync', [PlansController::class, 'sync'])->name('plans.sync');
});

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