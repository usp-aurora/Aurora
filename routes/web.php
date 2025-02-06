<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\LoginController;


Route::get('/', [PlansController::class, 'index']);

Route::prefix('plans')->group(function () {
    Route::post('/store', [PlansController::class, 'store'])->name('plans.store');
    Route::post('/update/{id}', [PlansController::class, 'update'])->name('plans.update');
    Route::delete('/delete/{id}', [PlansController::class, 'destroy'])->name('plans.destroy');
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


Route::get('/semesters', function() {
    return Inertia::render('Development/TestSemesters');
});

Route::get('/course-info', function() {
    return Inertia::render('Development/TestCourseInfo');
});

Route::get('/card', function () {
    return Inertia::render('Development/CardTest');
});

Route::get('/cards', function () {
    return Inertia::render('Development/CardsTest');
});


Route::get('/completion-bar', function () {
    return Inertia::render('Development/TestCompletionBar');
});

Route::get('/botao', function () {
    return Inertia::render('Development/TestButtons');
});