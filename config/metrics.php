<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Coleta de métricas de uso
    |--------------------------------------------------------------------------
    |
    | Quando habilitado, o Aurora registra eventos de uso (logins, usuários
    | ativos por dia, edições de grade, etc.) na tabela `activity_events`.
    | Nenhum IP ou user agent é armazenado.
    |
    */

    'enabled' => env('METRICS_ENABLED', true),

    /*
     * Fuso horário usado para definir "o dia" de cada evento (DAU, séries
     * diárias). Usamos o horário de Brasília para que um dia de uso seja
     * um dia de calendário para os alunos.
     */
    'timezone' => env('METRICS_TIMEZONE', 'America/Sao_Paulo'),

    /*
     * Números USP (codpes) com acesso ao painel /admin/metrics.
     * Separados por vírgula, ex.: METRICS_ADMINS=1234567,7654321
     */
    'admins' => array_values(array_filter(array_map(
        'trim',
        explode(',', (string) env('METRICS_ADMINS', ''))
    ))),

    /*
     * Eventos que o frontend pode enviar via POST /api/metrics/track.
     * Qualquer outro nome é rejeitado.
     */
    'client_events' => [
        'ui.subject_info_opened',
        'ui.suggested_view_toggled',
        'ui.undo',
        'ui.redo',
    ],

    /*
     * Por quantos dias manter eventos (comando metrics:prune).
     */
    'retention_days' => env('METRICS_RETENTION_DAYS', 730),
];
