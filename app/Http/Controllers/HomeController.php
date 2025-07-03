<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserAddedSubjectsController;

class HomeController extends Controller
{
    public function index()
    {
		$groupController = new GroupController();
		$planController = new PlanController();
		$subjectController = new SubjectController();
		$userController = new UserController();
        $userAddedSubjectsController = new UserAddedSubjectsController();

		list($plansData, $plannedSubjects) = $planController->index();
		$suggestedPlans = $planController->getSuggestedPlans();
		
		$groups = $groupController->loadCourseGroups(1);
		
		$userAddedSubjects = $userAddedSubjectsController->getUserAddedSubjects();
		$plansWithoutGroups = $planController->getPlansWithDefaultGroup();

		$groups = $groupController->attachSubjectsToGroupsMap($groups, $userAddedSubjects);
		$groups = $groupController->attachSubjectsToGroupsMap($groups, $plansWithoutGroups);

		$groupsSubjectCodes = $groupController->getGroupSubjects($groups);
		$userAddedSubjectCodes = $userAddedSubjectsController->getUserAddedSubjectCodes();
		
		$mergedSubjects = array_unique(array_merge($plannedSubjects, $groupsSubjectCodes, $userAddedSubjectCodes), SORT_REGULAR);
		$subjects = $subjectController->getSubjectsWithGroups($mergedSubjects);		
		$user = $userController->index();
		$onboarded = $userController->checkAndMarkOnboarded();
		$versionInfo = $userController->checkAndMarkVersionUpdate();

		return Inertia::render('Home', [
			'initialPlans' => $plansData,
			'suggestedPlans' => $suggestedPlans,
			'groups' => $groups,
			'subjects' => $subjects,
			'user' => $user,
			'onboarded' => $onboarded,
			'versionInfo' => $versionInfo,
		]);
	}
}
