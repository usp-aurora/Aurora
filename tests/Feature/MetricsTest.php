<?php

namespace Tests\Feature;

use App\Models\ActivityEvent;
use App\Models\User;
use App\Services\Metrics\Metrics;
use App\Services\Metrics\MetricsReport;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class MetricsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Route::middleware('web')->get('/metrics-probe', fn () => 'ok');
    }

    public function test_authenticated_user_is_counted_once_per_day(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/metrics-probe')->assertOk();
        $this->actingAs($user)->get('/metrics-probe')->assertOk();
        $this->actingAs($user)->get('/metrics-probe')->assertOk();

        $this->assertSame(1, ActivityEvent::where('event', Metrics::USER_ACTIVE)->where('user_id', $user->id)->count());
        $this->assertNotNull($user->fresh()->last_seen_at);
    }

    public function test_user_is_counted_again_on_a_new_day(): void
    {
        $user = User::factory()->create();

        $this->travelTo(now()->setTimezone('America/Sao_Paulo')->setTime(12, 0));
        $this->actingAs($user)->get('/metrics-probe');

        $this->travel(1)->days();
        $this->actingAs($user)->get('/metrics-probe');

        $this->assertSame(2, ActivityEvent::where('event', Metrics::USER_ACTIVE)->count());
    }

    public function test_guest_visitor_is_tracked_without_user(): void
    {
        $this->get('/metrics-probe')->assertOk();

        $event = ActivityEvent::where('event', Metrics::GUEST_ACTIVE)->firstOrFail();
        $this->assertNull($event->user_id);
        $this->assertSame(64, strlen($event->visitor_hash));
    }

    public function test_day_uses_metrics_timezone(): void
    {
        // 01:00 UTC is still the previous day in São Paulo (UTC-3).
        $this->travelTo(\Carbon\Carbon::parse('2026-03-10 01:00:00', 'UTC'));

        app(Metrics::class)->record('plans.synced', [], User::factory()->create());

        $this->assertSame('2026-03-09', substr(ActivityEvent::first()->occurred_on, 0, 10));
    }

    public function test_metrics_can_be_disabled(): void
    {
        config(['metrics.enabled' => false]);

        $this->actingAs(User::factory()->create())->get('/metrics-probe');
        app(Metrics::class)->record('plans.synced');

        $this->assertSame(0, ActivityEvent::count());
    }

    public function test_plan_sync_records_change_counts(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/api/plans/sync', [
            ['subject_code' => 'MAC0110', 'semester' => 1],
            ['subject_code' => 'MAC0121', 'semester' => 2],
        ])->assertOk();

        $event = ActivityEvent::where('event', Metrics::PLANS_SYNCED)->firstOrFail();
        $this->assertSame($user->id, $event->user_id);
        $this->assertSame(['created' => 2, 'updated' => 0, 'deleted' => 0], $event->properties);
    }

    public function test_client_can_track_allowed_events_only(): void
    {
        $this->postJson('/api/metrics/track', [
            'event' => 'ui.subject_info_opened',
            'properties' => ['subject_code' => 'MAC0110'],
        ])->assertNoContent();

        $this->postJson('/api/metrics/track', ['event' => 'anything.else'])->assertUnprocessable();
        $this->postJson('/api/metrics/track', [
            'event' => 'ui.undo',
            'properties' => ['nested' => ['not' => 'allowed']],
        ])->assertUnprocessable();

        $this->assertSame(1, ActivityEvent::where('event', 'ui.subject_info_opened')->count());
        $this->assertSame(0, ActivityEvent::where('event', 'anything.else')->count());
    }

    public function test_summary_is_restricted_to_metrics_admins(): void
    {
        $admin = User::factory()->create();
        $other = User::factory()->create();
        config(['metrics.admins' => [(string) $admin->codpes]]);

        $this->getJson('/api/metrics/summary')->assertUnauthorized();
        $this->actingAs($other)->getJson('/api/metrics/summary')->assertForbidden();
        $this->actingAs($admin)->getJson('/api/metrics/summary?days=7')
            ->assertOk()
            ->assertJsonPath('period.days', 7)
            ->assertJsonStructure(['headline' => ['dau', 'wau', 'mau', 'stickiness', 'weekly_retention'], 'daily', 'events']);
    }

    public function test_report_computes_active_users_and_retention(): void
    {
        $metrics = app(Metrics::class);
        [$a, $b, $c] = User::factory()->count(3)->create();

        $this->travelTo(now()->setTimezone('America/Sao_Paulo')->setTime(12, 0));
        $today = now();

        // Semana anterior: a e b ativos.
        $this->travelTo($today->copy()->subDays(10));
        $metrics->record(Metrics::USER_ACTIVE, [], $a);
        $metrics->record(Metrics::USER_ACTIVE, [], $b);

        // Esta semana: a volta; c é novo.
        $this->travelTo($today->copy()->subDays(2));
        $metrics->record(Metrics::USER_ACTIVE, [], $a);
        $metrics->record(Metrics::USER_ACTIVE, [], $c);
        $metrics->record(Metrics::SUBJECT_ADDED, ['subject_code' => 'MAC0110'], $c);

        $this->travelTo($today);
        $metrics->record(Metrics::USER_ACTIVE, [], $a);

        $summary = app(MetricsReport::class)->summary(30);
        $h = $summary['headline'];

        $this->assertSame(1, $h['dau']);
        $this->assertSame(2, $h['wau']);
        $this->assertSame(3, $h['mau']);
        $this->assertSame(0.5, $h['weekly_retention']);
        $this->assertCount(30, $summary['daily']);
        $this->assertSame(1, end($summary['daily'])['active_users']);
        $this->assertSame([['subject_code' => 'MAC0110', 'total' => 1]], $summary['top_added_subjects']);
    }

    public function test_report_command_runs(): void
    {
        $this->artisan('metrics:report', ['--days' => 7])->assertSuccessful();
    }
}
