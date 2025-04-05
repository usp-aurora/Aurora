<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Auth;
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
        
        $user = Auth::user();

        return Inertia::render('Home', [
            'subjects' => $mappedSubjects,
            'user' => $user
        ]);

    }

    public function getSubjectRequirements($subjectCode)
    {
        $allRequirements = Requirement::all();

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
