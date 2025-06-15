<?php

namespace App\Http\Controllers;

use App\Models\Replicado\ReplicadoSubject;
use App\Models\Replicado\ReplicadoSubjectRequirement;

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

	public function getSubjects($subjectIds) {
		$subjects = ReplicadoSubject::whereIn('code', $subjectIds)->get();

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
