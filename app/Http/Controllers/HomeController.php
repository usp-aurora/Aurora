<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\SubjectController;
use App\Models\Subject; 
use App\Models\Requirement; 

class HomeController extends Controller
{
    public function index()
    {

        $subjectCodes = Requirement::distinct()->pluck('subject_code');
        $requiredSubjectCodes = Requirement::distinct()->pluck('required_subject_code');
        $uniqueSubjectsCodes = $subjectCodes->merge($requiredSubjectCodes)->unique();
        
        $subjects = Subject::whereIn('code', $uniqueSubjectsCodes)->get();

        $mappedSubjects = $subjects->mapWithKeys(function ($subject) {
            return [
                $subject->code => [
                    'name' => $subject->name,
                ],
            ];
        });

        return Inertia::render('Home', [
            'subjects' => $mappedSubjects,
        ]);

    }

    public function getSubjectRequirements($subjectCode)
    {
        $visited = [];
        $backwardRequirements = $this->getRequirementsBackwardRecursive($subjectCode, $visited);
        if (($key = array_search($subjectCode, $visited)) !== false) {
            unset($visited[$key]);
        }
        $forwardRequirements = $this->getRequirementsForwardRecursive($subjectCode, $visited);

        $requirements = array_merge($backwardRequirements, $forwardRequirements);

        return response()->json([
            'nodes' => $visited,
            'links' => $requirements,
        ]);
    }

    private function getRequirementsForwardRecursive($subjectCode, &$visited)
    {
        if (in_array($subjectCode, $visited)) {
            return [];
        }

        $visited[] = $subjectCode;

        $requirements = Requirement::where('subject_code', $subjectCode)->get();
        $result = [];

        foreach ($requirements as $requirement) {
            $result[] = [$requirement->required_subject_code, $subjectCode];
            $result = array_merge($result, $this->getRequirementsForwardRecursive($requirement->required_subject_code, $visited));
        }

        return $result;
    }

    private function getRequirementsBackwardRecursive($subjectCode, &$visited = [])
    {
        if (in_array($subjectCode, $visited)) {
            return [];
        }

        $visited[] = $subjectCode;

        $requirements = Requirement::where('required_subject_code', $subjectCode)->get();
        
        $result = [];

        foreach ($requirements as $requirement) {
            $result[] = [$subjectCode, $requirement->subject_code];
            $result = array_merge($result, $this->getRequirementsBackwardRecursive($requirement->subject_code, $visited));
        }

        return $result;
    }
}
