<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth;
use Illuminate\Http\Request;
use App\Models\PlanoEstudos;
use Inertia\Inertia;

class PlanoEstudosController extends Controller
{
    // temporary function until the login system is implemented 
    private function getUserId()
    {
        return auth()->check() ? auth()->user()->id : 1;
    }

    // Show all plans by user.
    public function index()
    {
        $plans =  PlanoEstudos::where('id_usuario', 1)
            ->join('materias', 'planos_estudos.codigo_materia', '=', 'materias.codigo_materia')
            ->select('planos_estudos.*', 'materias.codigo_materia', 'materias.nome')
            ->get();


        return $plans->map(function ($plan) {
            return [
                'id' => $plan->id,
                'code' => $plan->codigo_materia,
                'title' => $plan->nome,
                'semester' => $plan->semestre,
            ];
        });
    }


    // To avoid conflicts, we might have to make this only 
    // callable by the update method.

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'id_materia' => 'required',
            'semestre' => 'required',
        ]);

        $plan = PlanoEstudos::create([
            'id_usuario' => $this->getUserId(),
            'id_materia' => $request->subject_id,
            'semestre' => $request->semester,
        ]);

        return response()->json(['success' => 'Plan created successfully!', 'plan' => $plan], 201);
    }


    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $request->validate([
            'id_materia' => 'required',
            'semestre' => 'required',
        ]);

        // Find the plan, create if not found
        $plan = PlanoEstudos::find($id) ?? $this->store($request);

        $plan->update([
            'id_materia' => $request->subject_id,
            'semestre' => $request->semester,
        ]);

        return response()->json(['success' => 'Plan successfully updated!', 'plan' => $plan], 200);
    }


    // Remove the specified resource from storage.
    public function destroy($id)
    {
        try {
            // Find the plan, if not found, consider it already deleted
            $plan = PlanoEstudos::find($id);

            if ($plan) {
                $plan->delete();
            }

            return response()->json(['success' => 'Plan successfully deleted!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting the plan'], 500);
        }
    }
}
