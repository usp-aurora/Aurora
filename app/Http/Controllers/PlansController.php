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

        return response()->json(['plans' => $groupedPlans,], 200);
    }

    public function sync(Request $request)
    {
        $data = $request->json()->all();
        $changedPlans = []; // Unificado para planos criados, atualizados ou deletados.

        try {
            foreach ($data as $plan) {
                if (isset($plan['id']) && isset($plan['semester'])) {
                    // Atualizar plano existente
                    $this->update(new Request([
                        'subject_id' => $plan['subject_id'],
                        'semester' => $plan['semester'],
                    ]), $plan['id']);

                    $changedPlans[] = [
                        'id' => $plan['id'],
                        'subject_id' => $plan['subject_id'],
                        'action' => 'updated'
                    ];
                } elseif (isset($plan['semester'])) {
                    // Criar novo plano
                   $this->store(new Request([
                        'subject_id' => $plan['subject_id'],
                        'semester' => $plan['semester'],
                    ]));

                    // Recupera o plano recém-criado
                    $newPlan = Plan::where('user_id', $this->getUserId())
                                    ->where('subject_id', $plan['subject_id'])
                                    ->where('semester', $plan['semester'])
                                    ->latest() 
                                    ->first();

                    $changedPlans[] = [
                        'id' => $newPlan->id,
                        'subject_id' => $newPlan->subject_id,
                        'action' => 'created'
                    ];
                } elseif (isset($plan['id'])) {
                    if (Plan::find($plan['id'])) {
                        $this->destroy($plan['id']);              

                        $changedPlans[] = [
                            'id' => $plan['id'],
                            'subject_id' => $plan['subject_id'],
                            'action' => 'deleted'
                        ];
                    }
                }
            }

            return response()->json([
                'status' => 'success', 
                'changedPlans' => $changedPlans
            ], 200);
        } catch (\Exception $e) {
            // Log de erro para investigação futura
            \Log::error('Erro ao sincronizar planos:', ['error' => $e->getMessage()]);
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

 
    // Store a newly created resource in storage.
    private function store(Request $request)
    {
        $validated = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'semester' => 'required|integer',
        ]);

        try {
            $plan = Plan::create([
                'user_id' => $this->getUserId(),
                'subject_id' => $validated['subject_id'],
                'semester' => $validated['semester'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Plan created successfully!',
                'plan' => $plan
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // Update the specified resource in storage.
    private function update(Request $request, $id)
    {
        $validated = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'semester' => 'required|integer',
        ]);

        try {
            $plan = Plan::findOrFail($id);

            $plan->update([
                'subject_id' => $validated['subject_id'],
                'semester' => $validated['semester'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Plan successfully updated!',
                'plan' => $plan
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Plan not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    // Remove the specified resource from storage.
    private function destroy($id) 
    {
        try {
            $plan = Plan::find($id);

            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Plan not found',
                ], 404);
            }

            $plan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Plan successfully deleted!',
                'deleted_plan' => [
                    'id' => $id,
                    'subject_id' => $plan->subject_id,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
