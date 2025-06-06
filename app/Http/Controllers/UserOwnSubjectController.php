<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserOwnSubject;
use Illuminate\Support\Facades\Auth;

class UserOwnSubjectController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'name' => 'required|string',
            'syllabus' => 'required|string',
            'lecture_credits' => 'nullable|string',
            'work_credits' => 'nullable|string',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $subject = $user->userOwnSubjects()->create($request->all());

        return response()->json($subject, 200);
    }
}
