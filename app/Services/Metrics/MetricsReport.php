<?php

namespace App\Services\Metrics;

use App\Models\ActivityEvent;
use App\Models\Plan;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;

/**
 * Agrega os eventos de `activity_events` em indicadores de sucesso da plataforma.
 */
class MetricsReport
{
    public function __construct(private Metrics $metrics)
    {
    }

    /**
     * @param int $days Janela (em dias, terminando hoje) para as séries e contagens.
     */
    public function summary(int $days = 30): array
    {
        $days = max(1, min($days, 365));
        $today = CarbonImmutable::parse($this->metrics->today());
        $from = $today->subDays($days - 1);

        $dau = $this->distinctActive($today, $today);
        $wau = $this->distinctActive($today->subDays(6), $today);
        $mau = $this->distinctActive($today->subDays(29), $today);

        return [
            'generated_at' => now()->toIso8601String(),
            'timezone' => config('metrics.timezone'),
            'period' => [
                'from' => $from->toDateString(),
                'to' => $today->toDateString(),
                'days' => $days,
            ],
            'headline' => [
                'total_users' => User::count(),
                'new_users' => $this->countEvents(Metrics::USER_REGISTERED, $from, $today),
                'dau' => $dau,
                'wau' => $wau,
                'mau' => $mau,
                // Proporção de usuários mensais que voltam em um dia qualquer.
                'stickiness' => $mau > 0 ? round($dau / $mau, 3) : null,
                'weekly_retention' => $this->weeklyRetention($today),
                'logins' => $this->countEvents(Metrics::USER_LOGIN, $from, $today),
                'guest_visitors' => $this->distinctGuests($from, $today),
                'activation_rate' => $this->activationRate(),
            ],
            'daily' => $this->dailySeries($from, $today),
            'events' => $this->eventCounts($from, $today),
            'top_added_subjects' => $this->topSubjects(Metrics::SUBJECT_ADDED, $from, $today),
            'top_viewed_subjects' => $this->topSubjects('ui.subject_info_opened', $from, $today),
        ];
    }

    private function distinctActive(CarbonImmutable $from, CarbonImmutable $to): int
    {
        return ActivityEvent::query()
            ->where('event', Metrics::USER_ACTIVE)
            ->whereBetween('occurred_on', [$from->toDateString(), $to->toDateString()])
            ->distinct()
            ->count('user_id');
    }

    private function distinctGuests(CarbonImmutable $from, CarbonImmutable $to): int
    {
        return ActivityEvent::query()
            ->where('event', Metrics::GUEST_ACTIVE)
            ->whereBetween('occurred_on', [$from->toDateString(), $to->toDateString()])
            ->distinct()
            ->count('visitor_hash');
    }

    private function countEvents(string $event, CarbonImmutable $from, CarbonImmutable $to): int
    {
        return ActivityEvent::query()
            ->where('event', $event)
            ->whereBetween('occurred_on', [$from->toDateString(), $to->toDateString()])
            ->count();
    }

    /**
     * Dos usuários ativos na semana anterior (dias -13..-7), quantos voltaram nesta semana (dias -6..0).
     */
    private function weeklyRetention(CarbonImmutable $today): ?float
    {
        $previous = $this->activeUserIds($today->subDays(13), $today->subDays(7));
        if ($previous->isEmpty()) {
            return null;
        }

        $current = $this->activeUserIds($today->subDays(6), $today);

        return round($previous->intersect($current)->count() / $previous->count(), 3);
    }

    private function activeUserIds(CarbonImmutable $from, CarbonImmutable $to)
    {
        return ActivityEvent::query()
            ->where('event', Metrics::USER_ACTIVE)
            ->whereBetween('occurred_on', [$from->toDateString(), $to->toDateString()])
            ->distinct()
            ->pluck('user_id');
    }

    /**
     * Fração dos usuários cadastrados que já planejaram ao menos uma disciplina futura.
     */
    private function activationRate(): ?float
    {
        $total = User::count();
        if ($total === 0) {
            return null;
        }

        $activated = Plan::query()
            ->where('completed', false)
            ->distinct()
            ->count('user_id');

        return round($activated / $total, 3);
    }

    private function dailySeries(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $rows = ActivityEvent::query()
            ->select('occurred_on', 'event', DB::raw('COUNT(*) as total'), DB::raw('COUNT(DISTINCT user_id) as users'), DB::raw('COUNT(DISTINCT visitor_hash) as visitors'))
            ->whereIn('event', [Metrics::USER_ACTIVE, Metrics::GUEST_ACTIVE, Metrics::USER_LOGIN, Metrics::USER_REGISTERED, Metrics::PLANS_SYNCED])
            ->whereBetween('occurred_on', [$from->toDateString(), $to->toDateString()])
            ->groupBy('occurred_on', 'event')
            ->get();

        $byDay = [];
        foreach ($rows as $row) {
            $day = CarbonImmutable::parse($row->occurred_on)->toDateString();
            $byDay[$day][$row->event] = $row;
        }

        $series = [];
        for ($day = $from; $day->lte($to); $day = $day->addDay()) {
            $d = $day->toDateString();
            $series[] = [
                'date' => $d,
                'active_users' => (int) ($byDay[$d][Metrics::USER_ACTIVE]->users ?? 0),
                'guest_visitors' => (int) ($byDay[$d][Metrics::GUEST_ACTIVE]->visitors ?? 0),
                'logins' => (int) ($byDay[$d][Metrics::USER_LOGIN]->total ?? 0),
                'new_users' => (int) ($byDay[$d][Metrics::USER_REGISTERED]->total ?? 0),
                'plan_edits' => (int) ($byDay[$d][Metrics::PLANS_SYNCED]->total ?? 0),
            ];
        }

        return $series;
    }

    private function eventCounts(CarbonImmutable $from, CarbonImmutable $to): array
    {
        return ActivityEvent::query()
            ->select('event', DB::raw('COUNT(*) as total'), DB::raw('COUNT(DISTINCT user_id) as users'))
            ->whereBetween('occurred_on', [$from->toDateString(), $to->toDateString()])
            ->groupBy('event')
            ->orderByDesc('total')
            ->get()
            ->map(fn ($row) => [
                'event' => $row->event,
                'total' => (int) $row->total,
                'users' => (int) $row->users,
            ])
            ->all();
    }

    private function topSubjects(string $event, CarbonImmutable $from, CarbonImmutable $to, int $limit = 10): array
    {
        return ActivityEvent::query()
            ->where('event', $event)
            ->whereBetween('occurred_on', [$from->toDateString(), $to->toDateString()])
            ->pluck('properties')
            ->map(fn ($props) => $props['subject_code'] ?? null)
            ->filter()
            ->countBy()
            ->sortDesc()
            ->take($limit)
            ->map(fn ($count, $code) => ['subject_code' => $code, 'total' => $count])
            ->values()
            ->all();
    }
}
