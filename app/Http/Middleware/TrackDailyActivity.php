<?php

namespace App\Http\Middleware;

use App\Services\Metrics\Metrics;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * Registra no máximo um evento "ativo hoje" por usuário (ou visitante
 * anônimo) por dia. É a base para DAU/WAU/MAU: como o login usa
 * "lembrar-me", contar apenas logins subestimaria muito o uso real.
 */
class TrackDailyActivity
{
    public function __construct(private Metrics $metrics)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (config('metrics.enabled')) {
            try {
                $this->track($request);
            } catch (Throwable) {
                // Métricas nunca devem afetar a resposta.
            }
        }

        return $response;
    }

    private function track(Request $request): void
    {
        $today = $this->metrics->today();
        $user = Auth::user();

        if ($user) {
            $key = "metrics:active:user:{$user->id}:{$today}";
            if (Cache::add($key, true, now()->addHours(26))) {
                $this->metrics->record(Metrics::USER_ACTIVE, [], $user);
                $user->forceFill(['last_seen_at' => now()])->saveQuietly();
            }

            return;
        }

        $visitor = $this->metrics->currentVisitorHash();
        if ($visitor === null) {
            return;
        }

        $key = "metrics:active:guest:{$visitor}:{$today}";
        if (Cache::add($key, true, now()->addHours(26))) {
            $this->metrics->record(Metrics::GUEST_ACTIVE, [], null, $visitor);
        }
    }
}
