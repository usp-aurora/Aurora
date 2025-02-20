<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\GroupController;

class HomeController extends Controller
{
    public function index() {
        
        $subjectController = new SubjectController();
        $groupController = new GroupController();

        return Inertia::render('Home', [
            'subjects' => $subjectController->index(),
            'groups' => $groupController->index(1)
        ]);
    }
}
