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

    // Sends to frontend all plans by the user     
    public function index()
    {
        $plans =  Plan::where('user_id', $this->getUserId())
                       ->orderBy('semester')->get();

        return Inertia::render('Home', [
            'plans' => $plans->map(function ($plan) {
                return [
                    'id' => $plan->id,
                    'code' => $plan->subject->code,
                    'semester' => $plan->semester,
                    'title' => $plan->subject->name,
                    'lecture_credits' => $plan->subject->lecture_credits,
                    'work_credits' => $plan->subject->work_credits,
                ];
            })
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('plans.create',[
            'plan' => new Plan,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'subject_id' => 'required',
            'semester' => 'required|integer',
        ]);
        
        $request['user_id'] = getUserId();

        $plan = Plan::create($request->all());
        request()->session()->flash('alert-info','Plano cadastrado com sucesso');
        return redirect("/plans");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plan $plan)
    {
        return view('plans.edit',[
            'plan' => $plan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Plan $plan)
    {
        $request->validate([
            'semester' => 'required|integer',
        ]);
        // only one atributte changes
        $plan->semester = $request->semester;
        $plan->update();
        
        request()->session()->flash('alert-info','Plano atualizado com sucesso');
        return redirect("/plans/{$plan->id}");
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        $plan->delete();
        return redirect('/plans');
    }
}
