<?php

namespace App\Console\Commands;

use App\Models\ActivityEvent;
use Illuminate\Console\Command;

class MetricsPruneCommand extends Command
{
    protected $signature = 'metrics:prune {--days= : Apaga eventos mais antigos que N dias (padrão: config metrics.retention_days)}';

    protected $description = 'Remove eventos de métricas antigos';

    public function handle(): int
    {
        $days = (int) ($this->option('days') ?: config('metrics.retention_days'));
        $deleted = ActivityEvent::where('created_at', '<', now()->subDays($days))->delete();

        $this->info("{$deleted} eventos removidos (mais antigos que {$days} dias).");

        return self::SUCCESS;
    }
}
