<?php

namespace App\Http\Controllers;

use App\Models\Subject;

class SubjectController extends Controller
{
	public function index()
	{
		$subjects = Subject::all();

		$transformedSubjects = $subjects->mapWithKeys(function ($subject) {
			return [
				$subject->code => [
					'name'         => $subject->name,
					'syllabus'     => $subject->syllabus,
					'credits'      => [$subject->lecture_credits, $subject->work_credits],
				],
			];
		});

		return $transformedSubjects;
	}
	
	public function exists($code)
	{
		$exists = Subject::where('code', $code)->exists();
	    return response()->json(['exists' => $exists]);
	}
}
