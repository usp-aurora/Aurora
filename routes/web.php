<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\PlanController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserAddedSubjectsController;
use App\Http\Controllers\MetricsController;
use App\Services\Metrics\Metrics;
use Inertia\Inertia;

Route::get('/app', [HomeController::class, 'index']);
Route::get('/anonymous', function (Metrics $metrics) {
    Auth::logout();
    $metrics->record(Metrics::GUEST_STARTED);
    return redirect()->action([HomeController::class, 'index']);
});
Route::get('/', function (Metrics $metrics) {
    $metrics->record(Metrics::LANDING_VIEWED, ['authenticated' => Auth::check()]);
    return Inertia::render('LandingPage');
});
Route::get('login', [LoginController::class, 'redirectToProvider'])->name('login');
Route::get('callback', [LoginController::class, 'handleProviderCallback']);
Route::get('logout', [LoginController::class, 'logout']);
Route::get('/export', [PlanController::class, 'export']);

Route::post('api/metrics/track', [MetricsController::class, 'track'])->middleware('throttle:60,1');

Route::middleware('auth')->group(function () {
    Route::get('admin/metrics', [MetricsController::class, 'dashboard']);
    Route::get('api/metrics/summary', [MetricsController::class, 'summary']);
});

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
