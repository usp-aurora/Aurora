<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CriteriosCompletude;
use App\Models\Grupo;
use App\Models\Materia;
use App\Models\MateriasGrupo;
use Illuminate\Support\Facades\DB;

class CarregaMateriasController extends Controller {

    // Função principal que recebe o id de um curso, carrega os grupos e devolve o json
    public function index($id_curso) {
        $curso = new \stdClass();
        $curso->grupos = [];
        $curso->materias = [];
        $this->carregaGrupos($id_curso, $curso);
        return response()->json($curso);
    }
    
    // Função recursiva que processa os grupos (e seus subgrupos) 
    private function carregaGrupos($id_grupo, &$curso) {
        
        $grupos = DB::table('grupos')
                    ->where('grupos.id', '=', $id_grupo)
                    ->select(["titulo", "descricao", "id"])->get();
        
        foreach ($grupos as $grupo) {
            $disciplinas = DB::table('materias_grupo')
                             ->where('materias_grupo.id_grupo', '=', $grupo->id)
                             ->join('materias', 'materias_grupo.id_materia', '=', 'materias.id')
                             ->select(["materias.codigo_materia", "materias.nome", "materias.ementa", "materias.creditos_aula", "materias.creditos_trabalho", ])->get();
            
            $grupoAtual = [
                'titulo' => $grupo->titulo,
                'descricao' => $grupo->descricao,
                'materias' => [],
                'subgrupos' => []
            ];
            
            foreach  ($disciplinas as $disciplina) {
                $grupoAtual['materias'][] = [
                    'codigo_materia' => $disciplina->codigo_material,
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
                $grupoAtual['subgrupos'][] = $this->carregaGruposRecursivo($subgrupo->id);
            }
            
            $curso->grupos[] = $grupoAtual;
            
        }
    }
    
    private function carregaGruposRecursivo($id_grupo_pai) {
    
        $grupos = DB::table('grupos')
                    ->where('grupos.id', '=', $id_grupo_pai)
                    ->select(["titulo", "descricao", "id"])->get();
                    
        $grupoEstrutura = [];
        
        foreach ($grupos as $grupo) {
            $disciplinas = DB::table('materias_grupo')
                             ->where('materias_grupo.id_grupo', '=', $grupo->id)
                             ->join('materia', 'materias_grupo.id_materia', '=', 'materia.id')
                             ->select(["materia.codigo_materia", "materia.nome", "materia.ementa", "materia.creditos_aula", "materia.creditos_trabalho", ])->get();
            
            $subgrupo = [
                'titulo' => $grupo->titulo,
                'descricao' => $grupo->descricao,
                'materias' => [],
                'subgrupos' => []
            ];
            
            foreach  ($disciplinas as $disciplina) {
                $subgrupo['materias'][] = [
                    'codigo_materia' => $disciplina->codigo_material,
                    'nome' => $disciplina->nome,
                    'ementa' => $disciplina->ementa,
                    'creditos_aula' => $disciplina->creditos_aula,
                    'creditos_trabalho' => $disciplina->creditos_trabalho
                ];
            }
            
            $subsubgrupos = DB::table('grupos')
                           ->where('grupos.id_grupo_pai', '=', $grupo->id)
                           ->select("id")->get();
                           
            foreach ($subsubgrupos as $subsubgrupo) {
                $subgrupo['subgrupos'][] = $this->carregaGruposRecursivo($subsubgrupo->id);
            }
            
            $grupoEstrutura[] = $subgrupo;
            
        }
        
        return $grupoEstrutura;
    
    }
    
}


