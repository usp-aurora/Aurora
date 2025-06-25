<?php

namespace App\Http\Controllers;

use App\Models\Curriculum;
use App\Models\Group;
use App\Models\GroupSubject;

class GroupController extends Controller {
    public function index($curriculum_id)
    {
        return $this->loadCourse($curriculum_id);
    }

    public function subjectBelongsToGroup($code)
	{
		$exists = GroupSubject::where('subject_code', $code)->exists();
	    return response()->json(['exists' => $exists]);
	}

    private function loadCourse($curriculum_id)
    {
        $curriculum = Curriculum::where('id', '=', $curriculum_id)
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
        $group = Group::where('groups.id', '=', $groupId)
            ->select(["title", "description", "id"])
            ->first();

        $groupJSON = [
            'title' => $group->title,
            'description' => $group->description,
            'subjects' => [],
            'subgroups' => []
        ];

        $subjects = GroupSubject::where('group_subjects.group_id', '=', $group->id)
            ->select(["group_subjects.subject_code"])->get();

        foreach ($subjects as $subject) {
            $groupJSON['subjects'][] = $subject->subject_code;
        }

        $subgroups = Group::where('groups.parent_group_id', '=', $group->id)
            ->select("id")->get();

        foreach ($subgroups as $subgroup) {
            $groupJSON['subgroups'][] = $this->recursiveLoadCourse($subgroup->id);
        }

        return $groupJSON;
    }

    public function getSubjectRootGroups($subject_code){
        $groups = GroupSubject::where('group_subjects.subject_code', '=', $subject_code)
            ->select(["group_id"])
            ->get();

        $groupRoots = [];
        foreach($groups as $group){
            $rootGroup = $this->getGroupRoot($group->group_id);
            $groupRoots[] = $rootGroup->title;
        }

        return $groupRoots;
    }

    private function getGroupRoot($groupId){
        $group = Group::where('groups.id', '=', $groupId)
            ->select(["id", "title",  "parent_group_id", "is_course_root"])
            ->first();

        return $this->getGroupRootRecursive($group);
    }  

    private function getGroupRootRecursive($group){
        $parentGroup = Group::where('groups.id', '=', $group->parent_group_id)
            ->select(["id", "title",  "parent_group_id", "is_course_root"])
            ->first();
            
        if($parentGroup->is_course_root){
            return $group;
        } else {
            return $this->getGroupRootRecursive($parentGroup);
        }
    }
}


