<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserSubjectAddedController;
use App\Models\SuggestedPlan;

class HomeController extends Controller
{
    public function index()
    {
        $groupController = new GroupController();
        $planController = new PlanController();
        $subjectController = new SubjectController();
        $userController = new UserController();
        $UserSubjectAddedController = new UserSubjectAddedController();

        $plansData = $planController->index();
        $suggestedPlans = $planController->getSuggestedPlans();
        $groups = $groupController->index(1);
        $groups = $UserSubjectAddedController->attachUserSubjectsAddedToGroups($groups);
        $subjects = $subjectController->index()->toArray();

        foreach ($subjects as $code => $subject) {
            $subjects[$code]["groups"] = $groupController->getSubjectRootGroups($code);
            $added = $UserSubjectAddedController->getGroup($code);
            if ($added)
                $subjects[$code]["groups"][] = $added;
        }

        $user = $userController->index();

        return Inertia::render('Home', [
            'initialPlans' => $plansData,
            'suggestedPlans' => $suggestedPlans,
            'groups' => $groups,
            'subjects' => $subjects,
            'user' => $user,
        ]);
    }
}
