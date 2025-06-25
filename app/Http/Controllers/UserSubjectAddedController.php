<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Group;
use App\Models\UserSubjectAdded;

class UserSubjectAddedController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user == null) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }
        $userSubjects = UserSubjectAdded::where('user_id', $user->id)->get();
        return response()->json($userSubjects);
    }

    public function store(Request $request)
    {
        // Check if user is authenticated
        $user = Auth::user();
        if ($user == null) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        // Find group id by title
        $validated = $request->validate([
            'group_title' => 'required|string',
            'subject_code' => 'required|string',
        ]);
        $group = Group::where('title', $validated['group_title'])->first();
        if (!$group) {
            return response()->json(['status' => 'error', 'message' => 'Grupo de disciplinas não encontrado'], 404);
        }

        // If the user already has this subject in a group, update the group_id
        $existingUserSubject = UserSubjectAdded::where('user_id', $user->id)
            ->where('subject_code', $validated['subject_code'])
            ->first();

        if ($existingUserSubject) {
            $existingUserSubject->update([
                'group_id' => $group->id,
            ]);
            return response()->json(['status' => 'success', 'message' => 'Grupo da disciplina atualizado.'], 201);
        }

        // Insert the new user subject relation
        try {
            UserSubjectAdded::create([
                'user_id' => $user->id,
                'group_id' => $group->id,
                'subject_code' => $validated['subject_code'],
            ]);
            return response()->json(['status' => 'success', 'message' => 'Disciplina adicionada com sucesso ao grupo.'], 201);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request)
    {
        // Check if user is authenticated
        $user = Auth::user();
        if ($user == null) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        // Find group id by title
        $validated = $request->validate([
            'group_title' => 'required|string',
            'subject_code' => 'required|string',
        ]);
        $group = Group::where('title', $validated['group_title'])->first();
        if (!$group) {
            return response()->json(['status' => 'error', 'message' => 'Grupo de disciplinas não encontrado'], 404);
        }

        // Delete the user subject relation
        try {
            $deleted = UserSubjectAdded::where('user_id', $user->id)
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

    public function attachUserSubjectsAddedToGroups($groups)
    {
        // Check if user is authenticated
        $user = Auth::user();
        if (!$user) {
            return $groups;
        }

        // Fetch all user-group-subject relations for this user
        $userSubjects = UserSubjectAdded::with('group')
            ->where('user_id', $user->id)
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
            $groupName = $userSubject->group->title;
            $subjectCode = $userSubject->subject_code;
            $addSubjectToGroup($groups, $groupName, $subjectCode);
        }
        return $groups;
    }

    public function getGroup($code)
    {
        $user = Auth::user();
        if (!$user) {
            return null;
        }

        $userSubject = UserSubjectAdded::with('group')
            ->where('user_id', $user->id)
            ->where('subject_code', $code)
            ->first();

        return $userSubject ? $userSubject->group->title : null;
    }
}
