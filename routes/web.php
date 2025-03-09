<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\StudentController;

// Route::get('/', [PlansController::class, 'index']);

// Route::prefix('plans')->group(function () {
//     Route::post('/store', [PlansController::class, 'store'])->name('plans.store');
//     Route::post('/update/{id}', [PlansController::class, 'update'])->name('plans.update');
//     Route::delete('/delete/{id}', [PlansController::class, 'destroy'])->name('plans.destroy');
// });

Route::get('callback', [LoginController::class, 'callbackHandler']);
Route::get('/teste-login', [IndexController::class, 'index']);
Route::get('/user', function() {
    return Auth::user();
});

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/professor/dashboard', [ProfessorController::class, 'index'])->name('professor.dashboard');
    Route::get('/student/dashboard', [StudentController::class, 'index'])->name('student.dashboard');
});

// Route::group(['middleware' => ['redirectIfAuthenticated']], function () {
//     Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
// });

// Routing para as páginas que estamos utilizando pra desenvolvimento
// !!! Lembre que apenas os arquivos em resources/js/Pages são acessíveis aqui !!!
// Route::get('/test', function() {
//     return Inertia::render('Development/Teste');
// });

// Route::get('/pokemon-card', function () {
//     return Inertia::render('Development/PokemonCard');
// });

// Route::get('/completion-bar', function () {
//     return Inertia::render('Development/TestCompletionBar');
// });

// Route::get('/botao', function () {
//     return Inertia::render('Development/TestButtons');
// });
