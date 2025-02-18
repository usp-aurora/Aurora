<?php 

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LoadSubjectsController extends Controller {

    // Função principal que recebe o id de um grupoCursoJSON, carrega os groups e devolve o json
    public function index($id_course) {
        return $this->loadCourse($id_course);
    }
    
    // Função recursiva que processa os groups (e seus subgroups) 
    private function loadCourse($id_course) {        
        $schedule = DB::table('courses')
                          ->where('id', '=', $id_course)
                          ->select(["schedule"])
                          ->first();
                           
        return($this->loadGroupsRecursive($schedule->schedule));
    }
    
    private function loadGroupsRecursive($id_group) {        
        $group = DB::table('groups')
                    ->where('groups.id', '=', $id_group)
                    ->select(["title", "description", "id"])
                    ->first();

        $groupJSON = [
            'title' => $group->title,
            'description' => $group->description,
            'subjects' => [],
            'subgroups' => []
        ];

        $subjects = DB::table('subjects_groups')
                            ->where('subjects_groups.id_group', '=', $group->id)
                            ->join('subjects', 'subjects_groups.subject_code', '=', 'subjects.subject_code')
                            ->select(["subjects.subject_code", "subjects.name", "subjects.syllabus", "subjects.class_credits", "subjects.job_credits", ])->get();

        foreach  ($subjects as $subject) {
            $groupJSON['subjects'][] = [
                'subject_code' => $subject->subject_code,
                'name' => $subject->name,
                'syllabus' => $subject->syllabus,
                'class_credits' => $subject->class_credits,
                'job_credits' => $subject->job_credits
            ];
        }
            
        $subgroups = DB::table('groups')
                        ->where('groups.id_group_father', '=', $group->id)
                        ->select("id")->get();
                           
        foreach ($subgroups as $subgroup) {
            $groupJSON['subgroups'][] = $this->loadGroupsRecursive($subgroup->id);
        }

        return $groupJSON;
    }
}


