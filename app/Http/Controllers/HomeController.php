<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;

class HomeController extends Controller
{
    public function index()
    {

        $groupController = new GroupController();
        $planController = new PlanController();
        $subjectController = new SubjectController();
        $userController = new UserController();

        $plans = $planController->index();
        $groups = $groupController->indexWithUserSubjects(1);
        $subjects = $subjectController->index()->toArray();        
        foreach ($subjects as $code => $subject) {
            $subjects[$code]["groups"] = $groupController->getSubjectRootGroups($code);
        }

        $user = $userController->index();

        error_log("HomeController: Initial plans: " . json_encode($plans));

        return Inertia::render('Home', [
            'initialPlans' => $plans,
            'groups' => $groups,
            'subjects' => $subjects,
            'user' => $user,
        ]);
    }
}
