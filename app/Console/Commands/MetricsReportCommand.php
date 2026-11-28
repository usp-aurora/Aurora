<?php

namespace App\Console\Commands;

use App\Services\Metrics\MetricsReport;
use Illuminate\Console\Command;

class MetricsReportCommand extends Command
{
    protected $signature = 'metrics:report {--days=30 : Janela em dias} {--json : Saída em JSON}';

    protected $description = 'Mostra os indicadores de uso do Aurora (DAU/WAU/MAU, logins, ações)';

    public function handle(MetricsReport $report): int
    {
        $summary = $report->summary((int) $this->option('days'));

        if ($this->option('json')) {
            $this->line(json_encode($summary, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            return self::SUCCESS;
        }

        $h = $summary['headline'];
        $pct = fn ($v) => $v === null ? '—' : round($v * 100, 1) . '%';

        $this->info("Aurora — {$summary['period']['from']} a {$summary['period']['to']} ({$summary['timezone']})");
        $this->table(['Indicador', 'Valor'], [
            ['Usuários cadastrados', $h['total_users']],
            ['Novos usuários no período', $h['new_users']],
            ['Ativos hoje (DAU)', $h['dau']],
            ['Ativos 7 dias (WAU)', $h['wau']],
            ['Ativos 30 dias (MAU)', $h['mau']],
            ['Stickiness (DAU/MAU)', $pct($h['stickiness'])],
            ['Retenção semanal', $pct($h['weekly_retention'])],
            ['Logins no período', $h['logins']],
            ['Visitantes anônimos no período', $h['guest_visitors']],
            ['Ativação (já planejou disciplina)', $pct($h['activation_rate'])],
        ]);

        $this->info('Por dia');
        $this->table(
            ['Dia', 'Ativos', 'Anônimos', 'Logins', 'Novos', 'Edições de grade'],
            array_map(fn ($d) => array_values($d), $summary['daily'])
        );

        $this->info('Eventos');
        $this->table(['Evento', 'Total', 'Usuários'], array_map(fn ($e) => array_values($e), $summary['events']));

        return self::SUCCESS;
    }
}
