<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    public function index()
    {
        return Inertia::render('LandingPage', []);
    }
}