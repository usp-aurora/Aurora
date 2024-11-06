<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth;
use Illuminate\Http\Request;
use App\Models\Plan;

class PlansController extends Controller
{
    // temporary function until the login system is implemented 
    private function getUserId() {
        return auth()->check() ? auth()->user()->id : 1;
    }

    // Returns all plans by user.
    public function index()
    {
        $plans =  Plan::where('user_id', $this->getUserId())
                        ->join('subjects', 'plans.subject_id', '=', 'subjects.id')
                        ->select('plans.*', 'subjects.code', 'subjects.name', 'subjects.syllabus', 'subjects.lecture_credits', 'subjects.work_credits')
                        ->get();

        $groupedPlans = [];

         for ($semester = 1; $semester <= max($plans->max('semester'), 8); $semester++) {
            
            $semesterPlans = $plans->filter(function ($plan) use ($semester) {
                return $plan->semester == $semester;
            });
            
            $groupedPlans[] = [
                'id' => $semester,
                'alias' => 'Semester ' . $semester,
                'credits' => [$semesterPlans->sum('lecture_credits'), $semesterPlans->sum('work_credits')],
                'courses' => $semesterPlans->map(function ($plan) {
                        return [
                            'plan' => $plan->id,
                            'id'   => $plan->subject_id,
                            'code' => $plan->code,
                            'title' => $plan->name,
                            'desc'  => $plan->syllabus,
                            'credits' => [$plan->lecture_credits, $plan->work_credits]
                        ];
                    })->values()->all() // make sure we return an array here, not a collection
            ];
        }

        return $groupedPlans;
    }


    // To avoid conflicts, we might have to make this only 
    // callable by the update method.
    
    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'semester' => 'required',
        ]);

        $plan = Plan::create([
            'user_id' => $this->getUserId(),
            'subject_id' => $request->subject_id,
            'semester' => $request->semester,
        ]);

        return response()->json(['success' => 'Plan created successfully!', 'plan' => $plan], 201);
    }


    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'semester' => 'required',
        ]);

        // Find the plan, create if not found
        $plan = Plan::findOrFail($id);    
        
        $plan->update([
            'subject_id' => $request->subject_id,
            'semester' => $request->semester,
        ]);

        return response()->json(['success' => 'Plan successfully updated!'], 200); 
    }
    

    // Remove the specified resource from storage.
    public function destroy($id) {
        try {
            // Find the plan, if not found, consider it already deleted
            $plan = Plan::find($id);

            if ($plan) {
                $plan->delete();
            }

            return response()->json(['success' => 'Plan successfully deleted!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting the plan'], 500);
        }
    }

}
