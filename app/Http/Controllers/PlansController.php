<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PlansController extends Controller
{
    public function test(){
        return Inertia::render('Development/Teste');
    }
}
