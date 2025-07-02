<?php

namespace App\Http\Controllers;

use App\Models\Curriculum;
use App\Models\Group;
use App\Models\GroupSubject;
use App\Models\CompletionRequirement;

use Illuminate\Http\JsonResponse;

class GroupController extends Controller {

    /**
     * @param string $subject_code
     * @return array<int, array{title: string, color: string}>
     */
    public function getSubjectRootGroups(string $subject_code): array {
        $groups = GroupSubject::where('group_subjects.subject_code', '=', $subject_code)
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

    public function subjectBelongsToGroup(string $code): JsonResponse
	{
		$exists = GroupSubject::where('subject_code', $code)->exists();
	    return response()->json(['exists' => $exists]);
	}

    /**
     * @param int $curriculum_id
     * @return array<string, mixed>|int
     */
    public function loadCourseGroups(int $curriculum_id): array|int
    {
        $curriculum = Curriculum::where('id', '=', $curriculum_id)
            ->select(["group_id"])
            ->first();

        if(!$curriculum) {
            return -1;
        }
        $rootGroupId = $curriculum->group_id;

        return ($this->recursiveLoadCourseGroups($rootGroupId));
    }

    /**
     * @param array<string, mixed> $groupArray
     * @return string[]
     */
    public function getGroupSubjects(array $groupArray): array {
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

    // Subjects must be a list like 
    //  [["subjectCode" => <code>, "groupId" => <groupId>], ...]
    /**
     * @param array<string, mixed> $groups
     * @param array<int, array{subjectCode: string, groupId: int}> $subjects
     * @return array<string, mixed>
     */
    public function attachSubjectsToGroupsMap(array $groups, array $subjects): array {
        $addSubjectToGroup = function (&$group, $groupId, $subjectCode) use (&$addSubjectToGroup) {
            if (isset($group['id']) && $group['id'] == $groupId) {
                if (!in_array($subjectCode, $group['subjects'])) {
                    $group['subjects'][] = ["code" => $subjectCode, "mandatory" => 0];
                }
            }
            if (isset($group['subgroups'])) {
                foreach ($group['subgroups'] as &$subgroup) {
                    $addSubjectToGroup($subgroup, $groupId, $subjectCode);
                }
            }
        };

        foreach ($subjects as $subject) {
            $groupId = $subject['groupId'];
            $subjectCode = $subject['subjectCode'];
            $addSubjectToGroup($groups, $groupId, $subjectCode);
        }
        
        return $groups;
    }

    private function getGroupRoot(int $groupId): Group {
        $group = Group::where('groups.id', '=', $groupId)
            ->where('groups.id', '=', $groupId)
            ->select(["id", "title", "color", "parent_group_id", "is_course_root"])
            ->first();

        return $this->getGroupRootRecursive($group);
    }  

    private function getGroupRootRecursive(Group $group): Group {
        $parentGroup = Group::where('groups.id', '=', $group->parent_group_id)
            ->select(["id", "title", "color",  "parent_group_id", "is_course_root"])
            ->first();
            
        if($parentGroup->is_course_root){
            return $group;
        } else {
            return $this->getGroupRootRecursive($parentGroup);
        }
    }

    /**
     * @param int $groupId
     * @return array<string, mixed>
     */
    private function recursiveLoadCourseGroups(int $groupId): array
    {
        $group = Group::where('groups.id', '=', $groupId)
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

        $subjects = GroupSubject::where('group_subjects.group_id', '=', $group->id)
            ->orderBy('group_subjects.mandatory', 'desc')
            ->select(["group_subjects.subject_code", "group_subjects.mandatory"])
            ->get();

        foreach ($subjects as $subject) {
            $groupJSON['subjects'][] = [
                'code' => $subject->subject_code,
                'mandatory' => $subject->mandatory
            ];}

        $completionRequirements = CompletionRequirement::where('completion_requirements.group_id', '=', $group->id)
            ->select(["type", "completion_value"])->get();

        foreach ($completionRequirements as $requirement) {
            $groupJSON['completionRequirements'][] = [
                'type' => $requirement->type,
                'value' => $requirement->completion_value
            ];
        }

        $subgroups = Group::where('groups.parent_group_id', '=', $group->id)
            ->select("id")->get();

        foreach ($subgroups as $subgroup) {
            $groupJSON['subgroups'][] = $this->recursiveLoadCourseGroups($subgroup->id);
        }

        return $groupJSON;
    }
}


