<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\SubjectController;

class HomeController extends Controller
{
    public function index() {
        
        $plansController = new PlansController();
        $subjectController = new SubjectController();

        return Inertia::render('Home', [
            'userPlans'   => $plansController->index(),
            'subjects' => $subjectController->index(),
        ]);
    }
}
