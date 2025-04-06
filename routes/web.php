<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\App;

Route::get('/', [HomeController::class, 'index']);

Route::get('/api/subject/{subjectCode}', [HomeController::class, 'getSubjectRequirements']);

Route::get('login', function () {
	abort(404);
});

if (!App::environment('production')) {
	Route::get('/teste_subject', [TestController::class, 'subject']);
	Route::get('/teste_requirement', [TestController::class, 'requirement']);
	Route::get('/teste_sr', [TestController::class, 'subjectWithRequirements']);
}