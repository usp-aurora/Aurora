<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class GroupController extends Controller {

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

    public function loadCourseGroups($curriculum_id)
    {
        $curriculum = DB::table('curriculums')
            ->where('id', '=', $curriculum_id)
            ->select(["group_id"])
            ->first();

        if(!$curriculum) {
            return -1;
        }
        $rootGroupId = $curriculum->group_id;

        return ($this->recursiveLoadCourseGroups($rootGroupId));
    }

    private function recursiveLoadCourseGroups($groupId)
    {
        $group = DB::table('groups')
            ->where('groups.id', '=', $groupId)
            ->select(["title", "description", "mandatory", "color", "id"])
            ->first();

        $groupJSON = [
            'id' => $group->id,
            'title' => $group->title,
            'description' => $group->description,
            'mandatory' => $group->mandatory,
            'completionRequirements' => [],
            'color' => $group->color,
            'subjects' => [],
            'subgroups' => []
        ];
        $subjects = DB::table('group_subjects')
            ->where('group_subjects.group_id', '=', $group->id)
            ->orderBy('group_subjects.mandatory', 'desc')
            ->select(["group_subjects.subject_code", "group_subjects.mandatory"])
            ->get();

        foreach ($subjects as $subject) {
            $groupJSON['subjects'][] = [
                'code' => $subject->subject_code,
                'mandatory' => $subject->mandatory
            ];}

        $completionRequirements = DB::table('completion_requirements')
            ->where('completion_requirements.group_id', '=', $group->id)
            ->select(["type", "completion_value"])->get();

        foreach ($completionRequirements as $requirement) {
            $groupJSON['completionRequirements'][] = [
                'type' => $requirement->type,
                'value' => $requirement->completion_value
            ];
        }
        $subgroups = DB::table('groups')
            ->where('groups.parent_group_id', '=', $group->id)
            ->select("id")->get();

        foreach ($subgroups as $subgroup) {
            $groupJSON['subgroups'][] = $this->recursiveLoadCourseGroups($subgroup->id);
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

    public function getGroupSubjects($groupArray) {
        if (!$groupArray["subgroups"]) {
            return array_column($groupArray["subjects"], 'code');
        }
        $result = [];
        foreach ($groupArray["subgroups"] as $subgroup) {
            $subjects = $this->getGroupSubjects($subgroup);
            $result = array_merge($result, $subjects);
        }
        return $result;
    }
}


