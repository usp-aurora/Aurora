<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TestController;

Route::get('/', [HomeController::class, 'index']);

Route::get('/api/subject/{subjectCode}', [HomeController::class, 'getSubjectRequirements']);

Route::get('login', [LoginController::class, 'redirectToProvider']);
Route::get('callback', [LoginController::class, 'handleProviderCallback']);
Route::get('logout', [LoginController::class, 'logout']);

Route::get('/teste_subject', [TestController::class, 'subject']);
Route::get('/teste_requirement', [TestController::class, 'requirement']);
Route::get('/teste_sr', [TestController::class, 'subjectWithRequirements']);