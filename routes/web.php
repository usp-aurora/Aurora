<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\PlanController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserAddedSubjectsController;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);
Route::get('/landing', function () {
    return Inertia::render('LandingPage');
});
Route::get('login', [LoginController::class, 'redirectToProvider']);
Route::get('callback', [LoginController::class, 'handleProviderCallback']);
Route::get('logout', [LoginController::class, 'logout']);
Route::get('/export', [PlanController::class, 'export']);

Route::middleware('auth')->prefix('api')->group(function () {
    Route::controller(PlanController::class)->prefix('plans')->group(function () {
        Route::get('index', 'index');
        Route::post('sync', 'sync');
    });

    Route::controller(UserAddedSubjectsController::class)->prefix('user-subjects')->group(function () {
        Route::post('add', 'store');
        Route::delete('remove', 'destroy');
    });

    Route::get('user', fn () => response()->json(Auth::user()));
    Route::get('requirement/{subjectCode}', [SubjectController::class, 'getSubjectRequirements']);
    Route::get('subject/exists/{code}', [SubjectController::class, 'exists']);
    Route::get('subject/{code}', [SubjectController::class, 'getSubjectWithGroups']);


    Route::get('groups/{code}', [GroupController::class, 'subjectBelongsToGroup']);
});
