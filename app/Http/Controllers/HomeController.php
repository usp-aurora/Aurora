<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Models\SuggestedPlan;

class HomeController extends Controller
{
	public function index()
	{
		$groupController = new GroupController();
		$planController = new PlanController();
		$subjectController = new SubjectController();
		$userController = new UserController();

		list($plansData, $plannedSubjects) = $planController->index();

		$suggestedPlans = $planController->getSuggestedPlans();
		$groups = $groupController->loadCourseGroups(1);
		$groupsSubjects = $groupController->getGroupSubjects($groups);

		$mergedSubjects = array_unique(array_merge($plannedSubjects, $groupsSubjects), SORT_REGULAR);
		$subjects = $subjectController->getSubjectsWithGroups($mergedSubjects);
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
