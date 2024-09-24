<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth;
use Illuminate\Http\Request;
use App\Models\Plan;
use Inertia\Inertia;

class PlansController extends Controller
{
    // temporary function until the login system is implemented 
    private function getUserId() {
        return auth()->check() ? auth()->user()->id : 1;
    }

    // Show all plans by user.
    public function index()
    {
        $plans =  Plan::where('user_id', $this->getUserId())->get();

        $maxSemester = max($plans->max('semester'), 8); 
        $groupedPlans = [];

         for ($semester = 1; $semester <= $maxSemester; $semester++) {
            
            $semesterPlans = $plans->filter(function ($plan) use ($semester) {
                return $plan->semester == $semester;
            });
            
            $groupedPlans[] = [
                'id' => $semester,
                'alias' => 'Semester ' . $semester,
                'courses' => $semesterPlans->map(function ($plan) {
                        return [
                            'id'   => $plan->subject->id,
                            'code' => $plan->subject->code,
                            'title' => $plan->subject->name,
                            'plan' => $plan->id,
                            'colors' => [
                                'background' => '#FFFFFF',
                                'innerLine' => '#51A1E0',
                                'outerLine' => '#17538D'
                            ],
                            'pokeball' => '#C2DCF5',
                        ];
                    })->values()->all() // make sure we return an array here, not a collection
            ];
        }

        return Inertia::render('Home', [
            'plans' => $groupedPlans
        ]);
    }


    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'subject_id' => 'required',
            'semester' => 'required',
        ]);

        $plan = Plan::create([
            'user_id' => getUserId(),
            'subject_id' => $request->subject_id,
            'semester' => $request->semester,
        ]);

        return response()->json(['success' => 'Plan created successfully!', 'plan' => $plan], 201);
    }


    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $request->validate([
            'subject_id' => 'required',
            'semester' => 'required',
        ]);

        // Find the plan, create if not found
        $plan = Plan::find($id) ?? $this->store($request);    
        
        $plan->update([
            'subject_id' => $request->subject_id,
            'semester' => $request->semester,
        ]);

        return response()->json(['success' => 'Plan successfully updated!', 'plan' => $plan], 200); 
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
