<?php

namespace App\Services\Metrics;

use App\Models\ActivityEvent;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Registro de eventos de uso do Aurora.
 *
 * Toda chamada é "fire and forget": uma falha ao gravar métricas nunca
 * deve quebrar a requisição do usuário.
 */
class Metrics
{
    // Eventos registrados pelo backend.
    public const USER_REGISTERED = 'user.registered';
    public const USER_LOGIN = 'user.login';
    public const USER_LOGOUT = 'user.logout';
    public const USER_ACTIVE = 'user.active';
    public const GUEST_ACTIVE = 'guest.active';
    public const GUEST_STARTED = 'guest.started';
    public const LANDING_VIEWED = 'landing.viewed';
    public const APP_OPENED = 'app.opened';
    public const PLANS_SYNCED = 'plans.synced';
    public const PLANS_EXPORTED = 'plans.exported';
    public const SUBJECT_ADDED = 'subject.added';
    public const SUBJECT_REMOVED = 'subject.removed';

    public function record(string $event, array $properties = [], ?User $user = null, ?string $visitorHash = null): void
    {
        if (! config('metrics.enabled')) {
            return;
        }

        try {
            $user ??= Auth::user();
            $now = now();

            ActivityEvent::create([
                'user_id' => $user?->id,
                'visitor_hash' => $visitorHash ?? ($user ? null : $this->currentVisitorHash()),
                'event' => $event,
                'properties' => $properties ?: null,
                'occurred_on' => $now->copy()->setTimezone(config('metrics.timezone'))->toDateString(),
                'created_at' => $now,
            ]);
        } catch (Throwable $e) {
            Log::warning('Failed to record metrics event', ['event' => $event, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Data de hoje no fuso das métricas.
     */
    public function today(): string
    {
        return now()->setTimezone(config('metrics.timezone'))->toDateString();
    }

    /**
     * Identificador anônimo e estável do visitante (hash da sessão).
     */
    public function currentVisitorHash(): ?string
    {
        try {
            $request = request();
            if (! $request->hasSession()) {
                return null;
            }

            return hash_hmac('sha256', $request->session()->getId(), (string) config('app.key'));
        } catch (Throwable) {
            return null;
        }
    }
}
