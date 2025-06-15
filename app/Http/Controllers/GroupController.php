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
            ->select(["title", "description", "id"])
            ->first();

        $groupJSON = [
            'title' => $group->title,
            'description' => $group->description,
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

    public function getSubjectRootGroups($subject_code){
        $groups = DB::table('group_subjects')
            ->where('group_subjects.subject_code', '=', $subject_code)
            ->select(["group_id"])
            ->get();

        $groupRoots = [];
        foreach($groups as $group){
            $rootGroup = $this->getGroupRoot($group->group_id);
            $groupRoots[] = $rootGroup->title;
        }

        return $groupRoots;
    }

    public function getSubjectsOfGroupRecursive($groupArray) {
        if (!$groupArray["subgroups"]) {
            return $groupArray["subjects"];
        }
        $result = [];
        foreach ($groupArray["subgroups"] as $subgroup) {
            $subjects = $this->getSubjectsOfGroupRecursive($subgroup);
            $result = array_merge($result, $subjects);
        }
        return $result;
    }

    private function getGroupRoot($groupId){
        $group = DB::table('groups')
            ->where('groups.id', '=', $groupId)
            ->select(["id", "title",  "parent_group_id", "is_course_root"])
            ->first();

        return $this->getGroupRootRecursive($group);
    }  

    private function getGroupRootRecursive($group){
        $parentGroup = DB::table('groups')
            ->where('groups.id', '=', $group->parent_group_id)
            ->select(["id", "title",  "parent_group_id", "is_course_root"])
            ->first();
            
        if($parentGroup->is_course_root){
            return $group;
        } else {
            return $this->getGroupRootRecursive($parentGroup);
        }
    }
}


