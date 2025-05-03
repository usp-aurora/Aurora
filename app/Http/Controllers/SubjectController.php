<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller {
    
    public function index() {
        return response()->json(Subject::all());
    }

    public function store(Request $request) {
        return response()->json([
            'payload_recebido' => $request->all(),
        ]);
    }
      
}


 