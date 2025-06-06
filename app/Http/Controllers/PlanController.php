<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth;
use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\SuggestedPlan;
use Illuminate\Support\Facades\Log;
use function Spatie\LaravelPdf\Support\pdf;

class PlanController extends Controller
{
    public function index()
    {
        if (auth()->user() == null) {
            $plans = SuggestedPlan::all();
        } else {
            $plans = Plan::where('user_id', auth()->user()->id)->get();
        }

        $groupedPlans = [];

        for ($semester = 1; $semester <= max($plans->max('semester'), 8); $semester++) {
            $semesterPlans = $plans->filter(fn($plan) => $plan->semester == $semester);

            $groupedPlans[] = [
                'semesterId' => $semester,
                'subjects' => $semesterPlans->map(function ($plan) {
                    return [
                        'plan' => $plan->id,
                        'code' => $plan->subject_code,
                    ];
                })->values()->all(),
            ];
        }

        return $groupedPlans;
    }

    public function export()
    {
        $plans = Plan::where('user_id', 1)->get();

        if ($plans->isEmpty()) {
            return response()->json(['error' => 'No plans available to export.'], 400);
        }


        $plans_subjects_grouped_by_semester = $plans->groupBy('semester')->map(function ($semester) {
            $formatted_semester = $semester->map(function ($plan) {
                return [
                    'name' => $plan->subject->name,
                    'code' => $plan->subject->code,
                    'lecture_credits' => $plan->subject->lecture_credits,
                    'work_credits' => $plan->subject->work_credits,
                ];
            });
            $formatted_semester['total_credits'] = $formatted_semester->sum('lecture_credits') + $formatted_semester->sum('work_credits');
            return $formatted_semester;
        });

        $semesterCount = $plans_subjects_grouped_by_semester->count();
        $half = max(1, intval($semesterCount / 2));
        $chunks = $plans_subjects_grouped_by_semester->sortKeys()->chunk($half)->values();

        $completed_semesters = $chunks->get(0, collect());
        $planned_semesters   = $chunks->get(1, collect());
        
        return pdf()->view('exportTemplate', [
            'user_name' => "Daiqui Teixeira Inacio",
            'user_code' => 123213123,
            'completed_semesters' => $completed_semesters,
            'planned_semesters' => $planned_semesters
        ])->name('export.pdf');
    }

    public function sync(Request $request)
    {
        $userId = auth()->user()->id;
        $changes = $request->json()->all();
        $userPlans = Plan::where('user_id', $userId)->get();
        $changedPlans = [];

        try {
            foreach ($changes as $change) {
                $subjectCode = $change['subject_code'];
                $existingPlan = $userPlans->where('subject_code', $subjectCode)->first();

                // Check if subject_code exists in subjects or user_own_subjects
                $subjectExists = \DB::table('subjects')->where('code', $subjectCode)->exists();
                $userOwnSubjectExists = \DB::table('user_own_subjects')->where('code', $subjectCode)->where('user_id', $userId)->exists();
                if (!$subjectExists && !$userOwnSubjectExists) {
                    continue; // skip this change if code is not found in either table
                }

                if ($existingPlan && isset($change['semester'])) {
                    $this->update($subjectCode, $change['semester'], $existingPlan['id'], $subjectExists, $userOwnSubjectExists);

                    $changedPlans[] = [
                        'id' => $existingPlan['id'],
                        'subject_code' => $subjectCode,
                        'action' => 'updated',
                    ];
                } elseif (!$existingPlan && isset($change['semester'])) {
                    $this->store($subjectCode, $change['semester'], $subjectExists, $userOwnSubjectExists);

                    $newPlan = Plan::where('user_id', $userId)
                        ->where('subject_code', $subjectCode)
                        ->where('semester', $change['semester'])
                        ->latest()
                        ->first();

                    $changedPlans[] = [
                        'id' => $newPlan->id,
                        'subject_code' => $newPlan->subject_code,
                        'action' => 'created',
                    ];
                } elseif ($existingPlan && !isset($change['semester'])) {
                    $this->destroy($existingPlan['id']);

                    $changedPlans[] = [
                        'id' => $existingPlan['id'],
                        'subject_code' => $subjectCode,
                        'action' => 'deleted',
                    ];
                }
            }

            return response()->json([
                'status' => 'success',
                'changedPlans' => $changedPlans,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error synchronizing plans:', ['error' => $e->getMessage()]);
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    // Update store and update to accept subject from either table
    private function store($subject_code, $semester, $subjectExists = null, $userOwnSubjectExists = null)
    {
        if ($subjectExists === null) {
            $subjectExists = \DB::table('subjects')->where('code', $subject_code)->exists();
        }
        if ($userOwnSubjectExists === null) {
            $userOwnSubjectExists = \DB::table('user_own_subjects')->where('code', $subject_code)->where('user_id', auth()->user()->id)->exists();
        }
        if (!$subjectExists && !$userOwnSubjectExists) {
            Log::error('Subject code not found in subjects or user_own_subjects', ['subject_code' => $subject_code]);
            return null;
        }
        $validated = validator(compact('subject_code', 'semester'), [
            'subject_code' => ['required', function ($attribute, $value, $fail) use ($subjectExists, $userOwnSubjectExists) {
                if (!$subjectExists && !$userOwnSubjectExists) {
                    $fail('The subject code does not exist in subjects or user_own_subjects.');
                }
            }],
            'semester' => 'required|integer',
        ])->validate();

        try {
            $plan = Plan::create([
                'user_id' => auth()->user()->id,
                'subject_code' => $validated['subject_code'],
                'semester' => $validated['semester'],
                'subject_type' => $subjectExists ? 'subject' : 'user_own_subject',
            ]);

            return $plan;
        } catch (\Exception $e) {
            Log::error('Error creating plan:', ['error' => $e->getMessage()]);
            return null;
        }
    }

    private function update($subject_code, $semester, $plan_id, $subjectExists = null, $userOwnSubjectExists = null)
    {
        if ($subjectExists === null) {
            $subjectExists = \DB::table('subjects')->where('code', $subject_code)->exists();
        }
        if ($userOwnSubjectExists === null) {
            $userOwnSubjectExists = \DB::table('user_own_subjects')->where('code', $subject_code)->where('user_id', auth()->user()->id)->exists();
        }
        if (!$subjectExists && !$userOwnSubjectExists) {
            Log::error('Subject code not found in subjects or user_own_subjects', ['subject_code' => $subject_code]);
            return null;
        }
        $validated = validator(compact('subject_code', 'semester', 'plan_id'), [
            'subject_code' => ['required', function ($attribute, $value, $fail) use ($subjectExists, $userOwnSubjectExists) {
                if (!$subjectExists && !$userOwnSubjectExists) {
                    $fail('The subject code does not exist in subjects or user_own_subjects.');
                }
            }],
            'semester' => 'required|integer',
            'plan_id' => 'required|exists:plans,id',
        ])->validate();

        try {
            $plan = Plan::findOrFail($validated['plan_id']);
            $plan->update([
                'subject_code' => $validated['subject_code'],
                'semester' => $validated['semester'],
                'subject_type' => $subjectExists ? 'subject' : 'user_own_subject',
            ]);
            return $plan;
        } catch (\Exception $e) {
            Log::error('Error updating plan:', ['plan_id' => $plan_id, 'error' => $e->getMessage()]);
            return null;
        }
    }

    private function destroy($id)
    {
        $validated = validator(compact('id'), [
            'id' => 'required|exists:plans,id',
        ])->validate();

        try {
            $plan = Plan::findOrFail($validated['id']);
            $plan->delete();

            return true;
        } catch (\Exception $e) {
            Log::error('Error deleting plan:', ['error' => $e->getMessage()]);

            return false;
        }
    }
}
