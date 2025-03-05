<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PlanController;

class HomeController extends Controller
{
    public function index() {
        
        $planController = new PlanController();
        $groupController = new GroupController();
        $subjectController = new SubjectController();

        $plans = $planController->index();
        $groups = $groupController->index(1);
        $subjects = $subjectController->index()->toArray();

        foreach ($subjects as &$subject) {
            $subject["groups"] = $groupController->getSubjectRootGroups($subject["code"]);
        }
        unset($subject);

        dd([
            'plans' => $plans,
            'groups' => $groups,
            'subjects' => $subjects,
        ]);
        // dd($groupController->index(1));
        // return Inertia::render('Home', [
        //     'groups' => $groupController->index(1)
        // ]);
    }
}
