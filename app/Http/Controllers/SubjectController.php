<?php

namespace App\Http\Controllers;

use App\Models\Replicado\ReplicadoSubject;
use App\Models\Replicado\ReplicadoSubjectRequirement;

class SubjectController extends Controller
{
	public function index()
	{
		$subjectCodes = ReplicadoSubjectRequirement::distinct()->pluck('subject_code');
        $requiredSubjectCodes = ReplicadoSubjectRequirement::distinct()->pluck('required_subject_code');
        $uniqueSubjectsCodes = $subjectCodes->merge($requiredSubjectCodes)->unique();
        
        $subjects = ReplicadoSubject::whereIn('code', $uniqueSubjectsCodes)->get();

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

    public function getSubject($subjectCode) {
		return $this->getSubjects([$subjectCode]);
	}

    public function getSubjectRequirements($subjectCode)
    {
        $allRequirements = ReplicadoSubjectRequirement::all();
		// dd($allRequirements);

        $forwardLookup = $allRequirements->groupBy('subject_code');
        $backwardLookup = $allRequirements->groupBy('required_subject_code');

        $visited = [];

        $backwardRequirements = $this->getRequirementsBackward($subjectCode, $backwardLookup, $visited);
        if (($key = array_search($subjectCode, $visited)) !== false) {
            unset($visited[$key]);
        }
        $forwardRequirements = $this->getRequirementsForward($subjectCode, $forwardLookup, $visited);

        $requirements = array_merge($backwardRequirements, $forwardRequirements);

        return response()->json([
            'nodes' => $visited,
            'links' => $requirements,
        ]);
    }

    private function getRequirementsForward($subjectCode, $forwardLookup, &$visited)
    {
        if (in_array($subjectCode, $visited)) {
            return [];
        }

        $visited[] = $subjectCode;

        $requirements = $forwardLookup->get($subjectCode, collect());
        $result = [];

        foreach ($requirements as $requirement) {
            $result[] = [$requirement->required_subject_code, $subjectCode];
            $result = array_merge($result, $this->getRequirementsForward($requirement->required_subject_code, $forwardLookup, $visited));
        }

        return $result;
    }

    private function getRequirementsBackward($subjectCode, $backwardLookup, &$visited)
    {
        if (in_array($subjectCode, $visited)) {
            return [];
        }

        $visited[] = $subjectCode;

        $requirements = $backwardLookup->get($subjectCode, collect());
        $result = [];

        foreach ($requirements as $requirement) {
            $result[] = [$subjectCode, $requirement->subject_code];
            $result = array_merge($result, $this->getRequirementsBackward($requirement->subject_code, $backwardLookup, $visited));
        }

        return $result;
    }
}
