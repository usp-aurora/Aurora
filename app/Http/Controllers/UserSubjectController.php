<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Group;

class UserSubjectController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if ($user == null) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }
        $userSubjects = \DB::table('user_subjects')
            ->where('user_id', $user->id)
            ->get();
        return response()->json($userSubjects);
    }

    public function store(Request $request)
    {
        // Check if user is authenticated
        $user = auth()->user();
        if ($user == null) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        // Find group id by title
        $validated = $request->validate([
            'group_title' => 'required|string',
            'subject_code' => 'required|string|exists:subjects,code',
        ]);
        $group = Group::where('title', $validated['group_title'])->first();
        if (!$group) {
            return response()->json(['status' => 'error', 'message' => 'Grupo de disciplinas não encontrado'], 404);
        }

        // Check if the combination of user_id, group_id, and subject_code already exists
        $existingUserSubject = \DB::table('user_subjects_added')
            ->where('user_id', $user->id)
            ->where('group_id', $group->id)
            ->where('subject_code', $validated['subject_code'])
            ->first();
        if ($existingUserSubject) {
            return response()->json(['status' => 'error', 'message' => 'Esta disciplina já pertence a algum grupo.'], 409);
        }

        // Insert the new user subject relation
        try {
            $userSubject = \DB::table('user_subjects_added')->insert([
                'user_id' => $user->id,
                'group_id' => $group->id,
                'subject_code' => $validated['subject_code'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            return response()->json(['status' => 'success', 'message' => 'Disciplina adicionada com sucesso ao grupo.'], 201);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request)
    {
        // Check if user is authenticated
        $user = auth()->user();
        if ($user == null) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        // Find group id by title
        $validated = $request->validate([
            'group_title' => 'required|string',
            'subject_code' => 'required|string|exists:subjects,code',
        ]);
        $group = Group::where('title', $validated['group_title'])->first();
        if (!$group) {
            return response()->json(['status' => 'error', 'message' => 'Grupo de disciplinas não encontrado'], 404);
        }

        // Delete the user subject relation
        try {
            $deleted = \DB::table('user_subjects_added')
                ->where('user_id', $user->id)
                ->where('group_id', $group->id)
                ->where('subject_code', $validated['subject_code'])
                ->delete();

            if ($deleted) {
                return response()->json(['status' => 'success', 'message' => 'Disciplina removida com sucesso do grupo.'], 200);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Essa disciplina não foi encontrada no grupo selecionado.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function populateGroupsWithUserSubjects($groups)
    {
        // Check if user is authenticated
        $user = auth()->user();
        if (!$user) {
            return $groups;
        }

        // Fetch all user-group-subject relations for this user
        $userSubjects = \DB::table('user_subjects_added')
            ->join('groups', 'user_subjects_added.group_id', '=', 'groups.id')
            ->where('user_subjects_added.user_id', $user->id)
            ->select(
                'groups.title as group_name',
                'user_subjects_added.subject_code',
                'user_subjects_added.user_id'
            )
            ->get();

        // Recursively add subject to the correct group
        $addSubjectToGroup = function (&$group, $groupName, $subjectCode) use (&$addSubjectToGroup) {
            if (isset($group['title']) && $group['title'] == $groupName) {
                if (!in_array($subjectCode, $group['subjects'])) {
                    $group['subjects'][] = $subjectCode;
                }
            }
            if (isset($group['subgroups'])) {
                foreach ($group['subgroups'] as &$subgroup) {
                    $addSubjectToGroup($subgroup, $groupName, $subjectCode);
                }
            }
        };

        // Add each user subject to the correct group
        foreach ($userSubjects as $userSubject) {
            $groupName = $userSubject->group_name;
            $subjectCode = $userSubject->subject_code;
            $addSubjectToGroup($groups, $groupName, $subjectCode);
        }
        return $groups;
    }
}
