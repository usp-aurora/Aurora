<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Group;
use App\Models\UserAddedSubject;
use App\Models\Plan;
use App\Http\Controllers\SubjectController;

class UserAddedSubjectsController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user == null) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        $validated = $request->validate([
            'groupTitle' => 'required|string',
            'subjectCode' => 'required|string',
        ]);
        $group = Group::where('title', $validated['groupTitle'])->first();
        if (!$group) {
            return response()->json(['status' => 'error', 'message' => 'Grupo de disciplinas não encontrado'], 404);
        }

        $message = "";
        // If the user already has this subject in a group, update the group_id
        $existingUserSubject = UserAddedSubject::where('user_id', $user->id)
            ->where('subject_code', $validated['subjectCode'])
            ->first();

        if ($existingUserSubject) {
            $existingUserSubject->update([
                'group_id' => $group->id,
            ]);
            $message = 'Grupo da disciplina atualizado.';
        } else {
            try {
                UserAddedSubject::create([
                    'user_id' => $user->id,
                    'group_id' => $group->id,
                    'subject_code' => $validated['subjectCode'],
                ]);

                $message = 'Disciplina adicionada com sucesso ao grupo.';
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
            }
        }

        $subjectController = new SubjectController();
        $subjectData = $subjectController->getSubjectsWithGroups([$validated['subjectCode']]);

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'subjectData' => $subjectData
        ], 201);
    }

    public function destroy(Request $request)
    {
        $user = Auth::user();
        if ($user == null) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        $validated = $request->validate([
            'subject_code' => 'required|string',
        ]);

        try {
            $deleted = UserAddedSubject::where('user_id', $user->id)
                ->where('subject_code', $validated['subject_code'])
                ->delete();

            if ($deleted) {
                Plan::where('user_id', $user->id)
                    ->where('subject_code', $validated['subject_code'])
                    ->delete();

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
        $user = Auth::user();
        if (!$user) {
            return $groups;
        }

        $userSubjects = UserAddedSubject::with('group')
            ->where('user_id', $user->id)
            ->get();

        $addSubjectToGroup = function (&$group, $groupName, $subjectCode) use (&$addSubjectToGroup) {
            if (isset($group['title']) && $group['title'] == $groupName) {
                if (!in_array($subjectCode, $group['subjects'])) {
                    $group['subjects'][] = ["code" => $subjectCode, "mandatory" => 0];
                }
            }
            if (isset($group['subgroups'])) {
                foreach ($group['subgroups'] as &$subgroup) {
                    $addSubjectToGroup($subgroup, $groupName, $subjectCode);
                }
            }
        };

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

        $userSubject = UserAddedSubject::with('group')
            ->where('user_id', $user->id)
            ->where('subject_code', $code)
            ->first();

        return $userSubject ? ["title" => $userSubject->group->title, "color" => $userSubject->group->color] : null;
    }

    public function getAllUserAddedSubjects()
    {
        $user = Auth::user();
        if ($user == null) {
            return [];
        }

        $userSubjects = UserAddedSubject::where('user_id', $user->id)
            ->pluck('subject_code')
            ->toArray();

        return $userSubjects;
    }
}
