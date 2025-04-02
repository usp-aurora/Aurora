<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Models\Subject; // Import the Subject model

class HomeController extends Controller
{
    public function index()
    {
        $groupController = new GroupController();
        $subjectController = new SubjectController();

        $subjects = $subjectController->index()->toArray();;

        foreach ($subjects as $code => $subject) {
            $subjects[$code]["groups"] = $groupController->getSubjectRootGroups($code);
        }

        return Inertia::render('Home', [
            'subjects' => $subjects,
        ]);
    }

    public function graph($subjectCode)
    {
        $subject = Subject::where('code', $subjectCode)->first();

        if (!$subject) {
            return response()->json(['error' => 'Subject not found'], 404);
        }

        // Example response structure
        $response = [
            'code' => $subject->code,
            'name' => $subject->name,
            'description' => $subject->description,
            'prerequisites' => $subject->prerequisites, // Assuming this is a relationship or attribute
        ];

        return response()->json($response);
    }
}
