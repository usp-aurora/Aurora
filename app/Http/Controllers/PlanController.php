<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth;
use Illuminate\Http\Request;
use App\Models\Plan;

class PlanController extends Controller
{
    /**
     * Retrieve all plans for the authenticated user, grouped by semester.
     *
     * This function fetches all plans associated with the logged-in user,
     * includes their related subjects, and organizes them by semester.
     *
     * @return \Illuminate\Http\JsonResponse A JSON response containing grouped plans by semester.
     */
    public function index()
    {
        $plans = Plan::where('user_id', auth()->user()->id )
            ->join('subjects', 'plans.subject_code', '=', 'subjects.code')
            ->select('plans.*', 'subjects.name', 'subjects.syllabus', 'subjects.lecture_credits', 'subjects.work_credits')
            ->get();

        $groupedPlans = [];

        for ($semester = 1; $semester <= max($plans->max('semester'), 8); $semester++) {
            $semesterPlans = $plans->filter(fn($plan) => $plan->semester == $semester);

            $groupedPlans[] = [
                'semesterId' => $semester,
                'courses' => $semesterPlans->map(function ($plan) {
                    return [
                        'plan' => $plan->id,
                        'code' => $plan->subject_code,
                        'title' => $plan->name,
                        'desc' => $plan->syllabus,
                        'credits' => [$plan->lecture_credits, $plan->work_credits],
                    ];
                })->values()->all(),
            ];
        }

        return response()->json(['plans' => $groupedPlans], 200);
    }


    /**
     * Synchronize plans with the database.
     *
     * Processes a batch of changes from the frontend, performing create, update, and delete actions.
     * Returns a summary of the changes made.
     *
     * @param \Illuminate\Http\Request $request The request object containing JSON data of changes.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating success or failure, along with the changed plans.
     */
    public function sync(Request $request)
    {
        $userId = auth()->user()->id; 
        $data = $request->json()->all();
        $userPlans = Plan::where('user_id', $userId)->get();
        $changedPlans = [];

        try {
            foreach ($data as $plan) {
                $existingPlan = $userPlans->where('subject_code', $plan['subject_code'])->first();
                if ($existingPlan && isset($plan['semester'])) {
                    // Update existing plan
                    $this->update(new Request([
                        'subject_code' => $plan['subject_code'],
                        'semester' => $plan['semester'],
                    ]), $existingPlan['id']);

                    $changedPlans[] = [
                        'id' => $existingPlan['id'],
                        'subject_code' => $plan['subject_code'],
                        'action' => 'updated',
                    ];
                } elseif (!$existingPlan && isset($plan['semester'])) {
                    // Create a new plan
                    $this->store(new Request([
                        'subject_code' => $plan['subject_code'],
                        'semester' => $plan['semester'],
                    ]));

                    $newPlan = Plan::where('user_id', $userId)
                        ->where('subject_code', $plan['subject_code'])
                        ->where('semester', $plan['semester'])
                        ->latest()
                        ->first();

                    $changedPlans[] = [
                        'id' => $newPlan->id,
                        'subject_code' => $newPlan->subject_id,
                        'action' => 'created',
                    ];
                } elseif ($existingPlan && isset($plan['id'])) {
                    $this->destroy($plan['id']);

                    $changedPlans[] = [
                        'id' => $plan['id'],
                        'subject_code' => $plan['subject_code'],
                        'action' => 'deleted',
                    ];
                }
            }

            return response()->json([
                'status' => 'success',
                'changedPlans' => $changedPlans,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error synchronizing plans:', ['error' => $e->getMessage()]);
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject_code' => 'required|exists:subjects,code',
            'semester' => 'required|integer',
        ]);

        try {
            $plan = Plan::create([
                'user_id' => auth()->user()->id ,
                'subject_code' => $validated['subject_code'],
                'semester' => $validated['semester'],
            ]);

            return response()->json([
                'status' => 'success',
                'data' => $plan
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating plan:', ['error' => $e->getMessage()]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create plan'
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'subject_code' => 'required|exists:subjects,code',
            'semester' => 'required|integer',
        ]);

        try {
            $plan = Plan::findOrFail($id);

            $plan->update([
                'subject_code' => $validated['subject_code'],
                'semester' => $validated['semester'],
            ]);

            return response()->json([
                'status' => 'success',
                'data' => $plan
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating plan:', ['error' => $e->getMessage()]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update plan'
            ], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $plan = Plan::findOrFail($id);
            $plan->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Plan deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting plan:', ['error' => $e->getMessage()]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete plan'
            ], 500);
        }
    }

}
