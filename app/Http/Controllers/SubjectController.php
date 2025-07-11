<?php

namespace App\Http\Controllers;

use App\Models\Replicado\ReplicadoSubject;
use App\Models\Replicado\ReplicadoSubjectRequirement;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\UserAddedSubjectsController;

class SubjectController extends Controller
{
    public function getSubjectWithGroups($subjectCode) {
        return $this->getSubjectsWithGroups([$subjectCode]);
    }

    public function getSubjectsWithGroups($subjectCodes) {
        $subjects = $this->getSubjectsById($subjectCodes);

		$groupController = new GroupController();
        $userAddedSubjectsController = new UserAddedSubjectsController();
		$subjects = $subjects->transform(function ($subject, $code) use ($groupController, $userAddedSubjectsController) {
			$subject['groups'] = $groupController->getSubjectRootGroups($code);
            $userAddedGroup = $userAddedSubjectsController->getGroup($code);
            if ($userAddedGroup !== null) {
                $subject['groups'][] = $userAddedGroup;
            }

            if (empty($subject["groups"])) {
                $subject["groups"] = [
                    [
                        'title' => 'Optativas Livres',
                        'color' => 'cyan'
                    ]
                ];
            }

			return $subject;
		});
        
        return $subjects;
    }

	public function getSubjectsById($subjectCodes) {
		$subjects = ReplicadoSubject::whereIn('code', $subjectCodes)->get();

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
		$exists = ReplicadoSubject::where('code', $code)->exists();
	    return response()->json(['exists' => $exists]);
	}

    public function getSubjectRequirements($subjectCode)
    {
        $allRequirements = ReplicadoSubjectRequirement::all();

        $forwardLookup = $allRequirements->groupBy('subject_code');
        $backwardLookup = $allRequirements->groupBy('required_subject_code');

        $visited = [];

        $backwardRequirements = $this->getRequirementsBackward($subjectCode, $backwardLookup, $visited);
        if (($key = array_search($subjectCode, $visited)) !== false) {
            unset($visited[$key]);
        }
        $forwardRequirements = $this->getRequirementsForward($subjectCode, $forwardLookup, $visited);

        $requirements = array_merge($backwardRequirements, $forwardRequirements);

        $subjectData = $this->getSubjectsWithGroups($visited);

        $validNodes = array_intersect($visited, array_keys($subjectData->toArray()));

        $validLinks = array_filter($requirements, function($link) use ($subjectData) {
            return $subjectData->has($link[0]) && $subjectData->has($link[1]);
        });

        return response()->json([
            'subjectData' => $subjectData,
            'nodes' => array_values($validNodes),
            'links' => array_values($validLinks),
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
