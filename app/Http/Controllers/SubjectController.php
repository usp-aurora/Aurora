<?php

namespace App\Http\Controllers;

use App\Models\UserOwnSubject;
use App\Models\Subject;

class SubjectController extends Controller
{
	public function index()
	{
		$user = auth()->user();
		$subjects = Subject::all();
		$mergedSubjects = collect();

		if ($user) {
			$userSubjects = UserOwnSubject::where('user_id', $user->id)->get();

			// Transform user subjects into a key-value map
			$userSubjectsMap = $userSubjects->mapWithKeys(function ($subject) {
				return [
					$subject->code => [
						'name'     => $subject->name,
						'syllabus' => $subject->syllabus,
						'credits'  => [$subject->lecture_credits, $subject->work_credits],
					]
				];
			});

			// Merge default subjects first, then override with user subjects
			$mergedSubjects = $subjects->mapWithKeys(function ($subject) use ($userSubjectsMap) {
				$code = $subject->code;
				return [
					$code => [
						'name'     => $subject->name,
						'syllabus' => $subject->syllabus,
						'credits'  => [$subject->lecture_credits, $subject->work_credits],
					]
				];
			})->merge($userSubjectsMap); // User subjects overwrite defaults if same key exists
		} else {
			// If no user, just return all default subjects
			$mergedSubjects = $subjects->mapWithKeys(function ($subject) {
				return [
					$subject->code => [
						'name'     => $subject->name,
						'syllabus' => $subject->syllabus,
						'credits'  => [$subject->lecture_credits, $subject->work_credits],
					]
				];
			});
		}

		return $mergedSubjects;
	}

}
