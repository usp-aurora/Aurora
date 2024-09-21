<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlansController;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/test', function() {
    return Inertia::render('Development/Teste');
});

Route::get('/', [PlansController::class, 'index']);

Route::prefix('plans')->group(function () {
    Route::post('/store', [PlansController::class, 'store'])->name('plans.store');
    Route::post('/update/{id}', [PlansController::class, 'update'])->name('plans.update');
    Route::delete('/delete/{id}', [PlansController::class, 'destroy'])->name('plans.destroy');
});