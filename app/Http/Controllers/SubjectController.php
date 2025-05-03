<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\CompletionRequirement;
use App\Models\Subject;
use App\Models\GroupSubject;
//use App\Models\Course;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubjectController extends Controller {
    
    public function index() {
        return response()->json(Subject::all());
    }

    private function createGroup($g) {
        $group = Group::create([
            'title' => $g['title'],
            'description' => $g['description'], 
            'parent_group_id' => 0  // for now (BCC)
        ]);
        return $group->id;
    }

    private function createCompletionRequirement($cr, $id) {
        foreach ($cr as $requirement) {
            CompletionRequirement::create([
                'type' => $requirement['type']['label'],
                'completion_value' => $requirement['quantity'], 
                'group_id' => $id 
            ]);
        }
    }

    private function createGroupSubject($s, $id) {
        foreach ($s as $subject) {
            GroupSubject::create([
                'group_id' => $id,
                'subject_code' => $subject['code'],
            ]);
        }
    }

    private function createSubject($s) {
        foreach ($s as $subject) {
            Subject::create([
                'name' => $subject['title'],
                'code' => $subject['code'],
                'syllabus' => $subject['syllabus'],
                'lecture_credits' => $subject['lecture_credits'],
                'work_credits' => $subject['work_credits'],
            ]);
        }
    }

    public function store(Request $request) {

        DB::beginTransaction();

        try{
            $mandatoryGroup = $request->input('mandatory');
            $electiveGroup = $request->input('elective');
            $freeGroup = $request->input('free');
        
            $mandatoryGroupId = $this->createGroup($mandatoryGroup);
            $electiveGroupId = $this->createGroup($electiveGroup);
            $freeGroupId = $this->createGroup($freeGroup);

            $this->createCompletionRequirement($mandatoryGroup['criteria'], $mandatoryGroupId);
            $this->createCompletionRequirement($electiveGroup['criteria'], $electiveGroupId);
            $this->createCompletionRequirement($freeGroup['criteria'], $freeGroupId);

            $this->createGroupSubject($mandatoryGroup['subjects'], $mandatoryGroupId);
            $this->createGroupSubject($electiveGroup['subjects'], $electiveGroupId);
            $this->createGroupSubject($freeGroup['subjects'], $freeGroupId);
        
            $this->createSubject($mandatoryGroup['subjects']);
            $this->createSubject($electiveGroup['subjects']);
            $this->createSubject($freeGroup['subjects']);

            DB::commit();
            return response()->json(['message' => 'Dados salvos com sucesso'], 200);
        }
        catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Erro ao salvar dados: ' . $e->getMessage()], 500);
        }

    }

}