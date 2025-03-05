<?php

namespace App\Http\Controllers;

use App\Models\Subject;

class SubjectController extends Controller
{
	public function index()
	{
		$subjects = Subject::all();

		$transformedSubjects = $subjects->map(function ($subject) {
			return [
				'code'         => $subject->code,
				'name'         => $subject->name,
				'syllabus'     => $subject->syllabus,
				'credits'      => [$subject->lecture_credits, $subject->work_credits],
			];
		});

		return $transformedSubjects;
	}
}
