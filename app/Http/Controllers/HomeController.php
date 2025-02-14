<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\PlanoEstudosController;
use App\Http\Controllers\CarregaMateriasController;

class HomeController extends Controller
{
    public function index() {
		$planController = new PlanoEstudosController();
		$materiasController = new CarregaMateriasController();

        return Inertia::render('Home', [
			'plans' => $planController->index(),
			'subjects' => $materiasController->index(1)
        ]);
    }
}