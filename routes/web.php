<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlansController;

Route::get('/', [PlansController::class, 'index']);

Route::prefix('plans')->group(function () {
    Route::post('/store', [PlansController::class, 'store'])->name('plans.store');
    Route::post('/update/{id}', [PlansController::class, 'update'])->name('plans.update');
    Route::delete('/delete/{id}', [PlansController::class, 'destroy'])->name('plans.destroy');
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