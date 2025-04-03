<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\SubjectController;
use App\Models\Subject; 
use App\Models\Requirement; 

class HomeController extends Controller
{
    public function index()
    {
        $groupController = new GroupController();
        $subjectController = new SubjectController();

        $subjects = $subjectController->index()->toArray();;

        foreach ($subjects as $code => $subject) {
            $subjects[$code]["groups"] = $groupController->getSubjectRootGroups($code);
        }

        return Inertia::render('Home', [
            'subjects' => $subjects,
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

    private function getRequirementsBackwardRecursive($subjectCode, &$visited)
    {
        if (in_array($subjectCode, $visited)) {
            return [];
        }

        $visited[] = $subjectCode;

        $requirements = Requirement::where('subject_code', $subjectCode)->get();
        $result = [];

        foreach ($requirements as $requirement) {
            $result[] = [$subjectCode, $requirement->required_subject_code];
            $result = array_merge($result, $this->getRequirementsBackwardRecursive($requirement->required_subject_code, $visited));
        }

        return $result;
    }

    private function getRequirementsForwardRecursive($subjectCode, &$visited = [])
    {
        if (in_array($subjectCode, $visited)) {
            return [];
        }

        $visited[] = $subjectCode;

        $requirements = Requirement::where('required_subject_code', $subjectCode)->get();
        
        $result = [];

        foreach ($requirements as $requirement) {
            $result[] = [$requirement->subject_code, $subjectCode];
            $result = array_merge($result, $this->getRequirementsForwardRecursive($requirement->subject_code, $visited));
        }

        return $result;
    }
}
