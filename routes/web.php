<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlanoEstudosController;

Route::get('/', [PlanoEstudosController::class, 'index']);

Route::prefix('planos')->group(function () {
    Route::post('/store', [PlanoEstudosController::class, 'store'])->name('plans.store');
    Route::post('/update/{id}', [PlanoEstudosController::class, 'update'])->name('plans.update');
    Route::delete('/delete/{id}', [PlanoEstudosController::class, 'destroy'])->name('plans.destroy');
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