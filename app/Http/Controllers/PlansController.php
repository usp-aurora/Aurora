<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth;
use Illuminate\Http\Request;
use App\Models\Plan;
use Inertia\Inertia;

class PlansController extends Controller
{
    public function test(){
        return Inertia::render('Development/Teste');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = 1;
        $plans =  Plan::where('user_id', $user_id)->orderBy('semester')->get();

        return view('plans.index', ['plans' => $plans]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Plan $plan)
    {
        return view('plans.show', ['plan' => $plan]);
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
        
        // $request['user_id'] =  auth()->user->id;
        $request['user_id'] = 1;

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
        
        request()->session()->flash('alert-info','Livro atualizado com sucesso');
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
