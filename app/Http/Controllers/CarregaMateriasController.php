<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CriteriosCompletude;
use App\Models\Grupo;
use App\Models\Materia;
use App\Models\MateriasGrupo;

class CarregaMaterias extends Controller 
{

    public function index($id_curso) {
        $ids = [$id_curso];
        
        // Consulta à tabela 'grupos' e armazena em $reqs o título e seus filhos
        $reqs = DB::table('grupos')
                  ->where('grupos.id', '=', $id_curso)
                  ->select(["titulo", "filhos"])->get();
        
        $curso->titulo = $reqs[0]->titulo;
        
        // Recursão para acessar cada subgrupo (e seus subgrupos)
        while(!null($ids)) {
            $id = array_shift($ids);
            $reqs = DB::table('grupos')
                      ->where('grupos.id_grupo_pai', '=', $id) 
                      ->select(["titulo", "filhos"])->get();
            
            // Alimentamos o JSON
            
            $ids.append($reqs->ids)
        
    }
    
    
}
