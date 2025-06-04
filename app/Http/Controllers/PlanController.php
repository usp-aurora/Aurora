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
        $user = auth()->user();
        if ($user == null) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        $plans = Plan::where('user_id', $user->id)->get();

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
                $existingPlan = $userPlans->where('subject_code', $change['subject_code'])->first();
                if ($existingPlan && isset($change['semester'])) {
                    $this->update($change['subject_code'], $change['semester'], $existingPlan['id']);

                    $changedPlans[] = [
                        'id' => $existingPlan['id'],
                        'subject_code' => $change['subject_code'],
                        'action' => 'updated',
                    ];
                } elseif (!$existingPlan && isset($change['semester'])) {
                    $this->store($change['subject_code'], $change['semester']);

                    $newPlan = Plan::where('user_id', $userId)
                        ->where('subject_code', $change['subject_code'])
                        ->where('semester', $change['semester'])
                        ->latest()
                        ->first();

                    $changedPlans[] = [
                        'id' => $newPlan->id,
                        'subject_code' => $newPlan->subject_id,
                        'action' => 'created',
                    ];
                } elseif ($existingPlan && !isset($change['semester'])) {
                    $this->destroy($existingPlan['id']);

                    $changedPlans[] = [
                        'id' => $existingPlan['id'],
                        'subject_code' => $change['subject_code'],
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

    private function store($subject_code, $semester)
    {
        $validated = validator(compact('subject_code', 'semester'), [
            'subject_code' => 'required|exists:subjects,code',
            'semester' => 'required|integer',
        ])->validate();

        try {
            $plan = Plan::create([
                'user_id' => auth()->user()->id,
                'subject_code' => $validated['subject_code'],
                'semester' => $validated['semester'],
            ]);

            return $plan;
        } catch (\Exception $e) {
            Log::error('Error creating plan:', ['error' => $e->getMessage()]);

            return null;
        }
    }

    private function update($subject_code, $semester, $plan_id)
    {
        $validated = validator(compact('subject_code', 'semester', 'plan_id'), [
            'subject_code' => 'required|exists:subjects,code',
            'semester' => 'required|integer',
            'plan_id' => 'required|exists:plans,id',
        ])->validate();

        try {
            $plan = Plan::findOrFail($validated['plan_id']);

            $plan->update([
                'subject_code' => $validated['subject_code'],
                'semester' => $validated['semester'],
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
