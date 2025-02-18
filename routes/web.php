<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlanoEstudosController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoadSubjectsController;


Route::get('/', [HomeController::class, 'index']);

Route::prefix('planos')->group(function () {
    Route::post('/store', [PlanoEstudosController::class, 'store'])->name('plans.store');
    Route::post('/update/{id}', [PlanoEstudosController::class, 'update'])->name('plans.update');
    Route::delete('/delete/{id}', [PlanoEstudosController::class, 'destroy'])->name('plans.destroy');
});
Route::get('/teste-login', [IndexController::class, 'index']);
Route::get('login', [LoginController::class, 'redirectToProvider']);
Route::get('callback', [LoginController::class, 'handleProviderCallback']);
Route::get('logout', [LoginController::class, 'logout']);

// Routing para as páginas que estamos utilizando pra desenvolvimento
// !!! Lembre que apenas os arquivos em resources/js/Pages são acessíveis aqui !!!


Route::get('/test', function() {
    return Inertia::render('Development/Test');
});

Route::get('/json-grupos/{id_curso}', [LoadSubjectsController::class, 'index']);