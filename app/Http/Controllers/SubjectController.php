<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller {
    
    public function index() {
        return response()->json(Subject::all());
    }

    public function store(Request $request) {
        
    \DB::beginTransaction();

    try {
        // 1. Cria o grupo
        $grupo = Grupo::create([
            'titulo' => $request->input('titulo_grupo'),
            'descricao' => $request->input('descricao_grupo'),
        ]);

        // 2. Itera sobre as categorias (obrigatórias, optativas, livres)
        foreach ($request->input('categorias') as $categoria) {
            // 2.1 Cria cada critério dessa categoria
            foreach ($categoria['criterios'] as $criterio) {
                CriterioCompletude::create([
                    'tipo' => $categoria['tipo'],
                    'valor_completude' => $criterio['valor_completude'],
                    'id_grupo' => $grupo->id,
                ]);
            }

            // 2.2 Adiciona as matérias
            foreach ($categoria['materias'] as $codigo) {
                MateriaGrupo::create([
                    'id_grupo' => $grupo->id,
                    'codigo_materia' => $codigo,
                ]);
            }
        }

        \DB::commit();
        return response()->json(['message' => 'Salvo com sucesso'], 201);

    } catch (\Exception $e) {
        \DB::rollBack();
        return response()->json(['error' => 'Erro ao salvar', 'details' => $e->getMessage()], 500);
    }
}


}
 