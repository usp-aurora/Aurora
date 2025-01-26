<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CarregaMateriasController extends Controller {

    // Função principal que recebe o id de um grupoCursoJSON, carrega os grupos e devolve o json
    public function index($id_curso) {
        return response()->json($this->carregaCurso($id_curso));
    }
    
    // Função recursiva que processa os grupos (e seus subgrupos) 
    private function carregaCurso($id_curso) {        
        $grade = DB::table('cursos')
                          ->where('id', '=', $id_curso)
                          ->select(["grade"])
                          ->first();
                           
        return($this->carregaGruposRecursivo($grade->grade));
    }
    
    private function carregaGruposRecursivo($id_grupo) {        
        $grupo = DB::table('grupos')
                    ->where('grupos.id', '=', $id_grupo)
                    ->select(["titulo", "descricao", "id"])
                    ->first();

        $grupoJSON = [
            'titulo' => $grupo->titulo,
            'descricao' => $grupo->descricao,
            'materias' => [],
            'subgrupos' => []
        ];

        $disciplinas = DB::table('materias_grupos')
                            ->where('materias_grupos.id_grupo', '=', $grupo->id)
                            ->join('materias', 'materias_grupos.codigo_materia', '=', 'materias.codigo_materia')
                            ->select(["materias.codigo_materia", "materias.nome", "materias.ementa", "materias.creditos_aula", "materias.creditos_trabalho", ])->get();

        foreach  ($disciplinas as $disciplina) {
            $grupoJSON['materias'][] = [
                'codigo_materia' => $disciplina->codigo_materia,
                'nome' => $disciplina->nome,
                'ementa' => $disciplina->ementa,
                'creditos_aula' => $disciplina->creditos_aula,
                'creditos_trabalho' => $disciplina->creditos_trabalho
            ];
        }
            
        $subgrupos = DB::table('grupos')
                        ->where('grupos.id_grupo_pai', '=', $grupo->id)
                        ->select("id")->get();
                           
        foreach ($subgrupos as $subgrupo) {
            $grupoJSON['subgrupos'][] = $this->carregaGruposRecursivo($subgrupo->id);
        }

        return $grupoJSON;
    }
}


