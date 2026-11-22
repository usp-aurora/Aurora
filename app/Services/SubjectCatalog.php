<?php

namespace App\Services;

use App\Models\Replicado\ReplicadoSubject;
use App\Models\Subject;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class SubjectCatalog
{
    public function get(array $codes): Collection
    {
        $codes = array_values(array_unique($codes));
        if (!$codes) {
            return collect();
        }

        if (!config('services.replicado_is_active')) {
            return $this->local($codes);
        }

        try {
            return $this->replicated($codes);
        } catch (QueryException $exception) {
            report($exception);
            $subjects = $this->local($codes);
            $missing = array_diff($codes, $subjects->pluck('code')->all());
            if ($missing) {
                Log::warning('Local subject catalog is incomplete.', ['missing_codes' => array_values($missing)]);
            }
            if ($subjects->isEmpty()) {
                abort(503, 'Não foi possível acessar os servidores da USP e o catálogo local não contém as disciplinas necessárias.');
            }

            return $subjects;
        }
    }

    protected function replicated(array $codes): Collection
    {
        return ReplicadoSubject::whereIn('code', $codes)->get();
    }

    protected function local(array $codes): Collection
    {
        return Subject::whereIn('code', $codes)->get();
    }
}
