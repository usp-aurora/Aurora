<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class GroupController extends Controller {
    public function index($curriculum_id)
    {
        return $this->loadCourse($curriculum_id);
    }

    private function loadCourse($curriculum_id)
    {
        $root_group_id = DB::table('curriculums')
            ->where('id', '=', $curriculum_id)
            ->select(["group_id"])
            ->first()
            ->group_id;

        return ($this->recursiveLoadCourse($root_group_id));
    }

    private function recursiveLoadCourse($group_id)
    {
        $group = DB::table('groups')
            ->where('groups.id', '=', $group_id)
            ->select(["title", "description", "id"])
            ->first();

        $groupJSON = [
            'title' => $group->title,
            'description' => $group->description,
            'subjects' => [],
            'subgroups' => []
        ];

        $disciplinas = DB::table('group_subjects')
            ->where('group_subjects.group_id', '=', $group->id)
            ->join('subjects', 'group_subjects.subject_code', '=', 'subjects.subject_code')
            ->select(["subjects.subject_code", "subjects.name", "subjects.syllabus", "subjects.lecture_credits", "subjects.work_credits",])->get();

        foreach ($disciplinas as $disciplina) {
            $groupJSON['subjects'][] = [
                'subject_code' => $disciplina->subject_code,
                'name' => $disciplina->name,
                'syllabus' => $disciplina->syllabus,
                'lecture_credits' => $disciplina->lecture_credits,
                'work_credits' => $disciplina->work_credits
            ];
        }

        $subgroups = DB::table('groups')
            ->where('groups.parent_group_id', '=', $group->id)
            ->select("id")->get();

        foreach ($subgroups as $subgroup) {
            $groupJSON['subgroups'][] = $this->recursiveLoadCourse($subgroup->id);
        }

        return $groupJSON;
    }
}


