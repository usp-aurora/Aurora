<?php

namespace App\Http\Controllers;

use App\Services\Metrics\Metrics;
use App\Services\Metrics\MetricsReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MetricsController extends Controller
{
    /**
     * Recebe eventos de interface enviados pelo frontend (lista permitida em config/metrics.php).
     */
    public function track(Request $request, Metrics $metrics)
    {
        $validated = $request->validate([
            'event' => ['required', 'string', Rule::in(config('metrics.client_events'))],
            'properties' => ['sometimes', 'array', 'max:10'],
            'properties.*' => ['nullable', function (string $attribute, mixed $value, \Closure $fail) {
                if (! is_scalar($value) || mb_strlen((string) $value) > 255) {
                    $fail("{$attribute} must be a short scalar value.");
                }
            }],
        ]);

        $metrics->record($validated['event'], $validated['properties'] ?? []);

        return response()->noContent();
    }

    public function summary(Request $request, MetricsReport $report)
    {
        Gate::authorize('view-metrics');

        return response()->json($report->summary((int) $request->query('days', 30)));
    }

    public function dashboard(Request $request, MetricsReport $report)
    {
        Gate::authorize('view-metrics');

        return Inertia::render('Metrics', [
            'summary' => $report->summary((int) $request->query('days', 30)),
        ]);
    }
}
