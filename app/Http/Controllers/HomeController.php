<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\SubjectController;

class HomeController extends Controller
{
    public function index() {
        
        $subjectController = new SubjectController();

        return Inertia::render('Home', [
            'subjects' => $subjectController->index(),
        ]);
    }
}
