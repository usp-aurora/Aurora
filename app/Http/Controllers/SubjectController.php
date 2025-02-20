<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;

class SubjectController extends Controller
{
    // Returns all subjects as HashMap
    public function index()
    {
        $subjects = Subject::all();

        return $subjects->map(function ($subject) {
            return [
                'code'         => $subject->code,
                'name'         => $subject->name,
                'desc'         => $subject->syllabus,
                'credits'      => [$subject->lecture_credits, $subject->work_credits],
            ];
        });;
    }
}
