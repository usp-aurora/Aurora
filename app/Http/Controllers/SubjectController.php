<?php

namespace App\Http\Controllers;

use App\Models\ReplicadoSubject;

class SubjectController extends Controller
{
	public function index()
	{
		$subjects = ReplicadoSubject::all();

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
}
