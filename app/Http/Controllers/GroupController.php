<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class GroupController extends Controller {
    public function index($curriculum_id)
    {
        return $this->loadCourse($curriculum_id);
    }

    public function getSubjectRootGroups($subject_code){
        $groups = DB::table('group_subjects')
            ->where('group_subjects.subject_code', '=', $subject_code)
            ->select(["group_id"])
            ->get();

        $groupRoots = [];
        $seen = [];
        foreach($groups as $group){
            $rootGroup = $this->getGroupRoot($group->group_id);
            if (!isset($seen[$rootGroup->id])) {
                $groupRoots[] = ["title" => $rootGroup->title, "color" => $rootGroup->color];
                $seen[$rootGroup->id] = true;
            }
        }

        return $groupRoots;
    }

    private function loadCourse($curriculum_id)
    {
        $curriculum = DB::table('curriculums')
            ->where('id', '=', $curriculum_id)
            ->select(["group_id"])
            ->first();

        if(!$curriculum) {
            return -1;
        }
        $rootGroupId = $curriculum->group_id;

        return ($this->recursiveLoadCourse($rootGroupId));
    }

    private function recursiveLoadCourse($groupId)
    {
        $group = DB::table('groups')
            ->where('groups.id', '=', $groupId)
            ->select(["title", "description", "color", "id"])
            ->first();

        $groupJSON = [
            'title' => $group->title,
            'description' => $group->description,
            'color' => $group->color,
            'subjects' => [],
            'subgroups' => []
        ];

        $subjects = DB::table('group_subjects')
            ->where('group_subjects.group_id', '=', $group->id)
            ->select(["group_subjects.subject_code"])->get();

        foreach ($subjects as $subject) {
            $groupJSON['subjects'][] = $subject->subject_code;
        }

        $subgroups = DB::table('groups')
            ->where('groups.parent_group_id', '=', $group->id)
            ->select("id")->get();

        foreach ($subgroups as $subgroup) {
            $groupJSON['subgroups'][] = $this->recursiveLoadCourse($subgroup->id);
        }

        return $groupJSON;
    }

    private function getGroupRoot($groupId){
        $group = DB::table('groups')
            ->where('groups.id', '=', $groupId)
            ->select(["id", "title", "color", "parent_group_id", "is_course_root"])
            ->first();

        return $this->getGroupRootRecursive($group);
    }  

    private function getGroupRootRecursive($group){
        $parentGroup = DB::table('groups')
            ->where('groups.id', '=', $group->parent_group_id)
            ->select(["id", "title", "color",  "parent_group_id", "is_course_root"])
            ->first();
            
        if($parentGroup->is_course_root){
            return $group;
        } else {
            return $this->getGroupRootRecursive($parentGroup);
        }
    }
}


