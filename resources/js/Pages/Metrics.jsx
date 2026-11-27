import { Box, Container, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { router } from "@inertiajs/react";

import StatTile from "../Features/Metrics/StatTile";
import DailyActiveChart from "../Features/Metrics/DailyActiveChart";
import SimpleTable from "../Features/Metrics/SimpleTable";

const percent = (value) => (value === null || value === undefined ? "—" : `${(value * 100).toFixed(1)}%`);

const EVENT_LABELS = {
    "user.active": "Usuário ativo no dia",
    "guest.active": "Visitante anônimo no dia",
    "user.login": "Login",
    "user.registered": "Novo cadastro",
    "user.logout": "Logout",
    "guest.started": "Entrou sem login",
    "landing.viewed": "Visitou a landing page",
    "app.opened": "Abriu o planejador",
    "plans.synced": "Editou a grade",
    "plans.exported": "Exportou PDF",
    "subject.added": "Adicionou disciplina a grupo",
    "subject.removed": "Removeu disciplina",
    "ui.subject_info_opened": "Abriu detalhes de disciplina",
    "ui.suggested_view_toggled": "Alternou grade recomendada",
    "ui.undo": "Desfazer",
    "ui.redo": "Refazer",
};

function Metrics({ summary }) {
    const { headline, daily, events, period } = summary;

    const changeDays = (_, days) => {
        if (days) router.get("/admin/metrics", { days }, { preserveScroll: true });
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#F5F6F8", color: "text.primary", py: 4 }}>
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={2}>
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: "#1F2328" }}>Métricas do Aurora</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {period.from} a {period.to} · fuso {summary.timezone}
                            </Typography>
                        </Box>
                        <ToggleButtonGroup size="small" exclusive value={period.days} onChange={changeDays}>
                            {[7, 30, 90].map(d => <ToggleButton key={d} value={d}>{d} dias</ToggleButton>)}
                        </ToggleButtonGroup>
                    </Stack>

                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        <StatTile label="Ativos hoje (DAU)" value={headline.dau} />
                        <StatTile label="Ativos em 7 dias (WAU)" value={headline.wau} />
                        <StatTile label="Ativos em 30 dias (MAU)" value={headline.mau} />
                        <StatTile label="Stickiness" value={percent(headline.stickiness)} hint="DAU / MAU" />
                        <StatTile label="Retenção semanal" value={percent(headline.weekly_retention)} hint="ativos na semana passada que voltaram" />
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        <StatTile label="Usuários cadastrados" value={headline.total_users} />
                        <StatTile label="Novos no período" value={headline.new_users} />
                        <StatTile label="Logins no período" value={headline.logins} />
                        <StatTile label="Visitantes anônimos" value={headline.guest_visitors} hint="sessões sem login no período" />
                        <StatTile label="Ativação" value={percent(headline.activation_rate)} hint="usuários que já planejaram uma disciplina" />
                    </Stack>

                    <DailyActiveChart daily={daily} />

                    <SimpleTable
                        title="Por dia"
                        columns={[
                            { key: "date", label: "Dia" },
                            { key: "active_users", label: "Ativos", numeric: true },
                            { key: "guest_visitors", label: "Anônimos", numeric: true },
                            { key: "logins", label: "Logins", numeric: true },
                            { key: "new_users", label: "Novos", numeric: true },
                            { key: "plan_edits", label: "Edições de grade", numeric: true },
                        ]}
                        rows={[...daily].reverse()}
                    />

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Box sx={{ flex: 2 }}>
                            <SimpleTable
                                title="O que os usuários fazem"
                                columns={[
                                    { key: "label", label: "Ação" },
                                    { key: "total", label: "Vezes", numeric: true },
                                    { key: "users", label: "Usuários", numeric: true },
                                ]}
                                rows={events.map(e => ({ ...e, label: EVENT_LABELS[e.event] ?? e.event }))}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <SimpleTable
                                title="Disciplinas mais abertas"
                                columns={[
                                    { key: "subject_code", label: "Código" },
                                    { key: "total", label: "Vezes", numeric: true },
                                ]}
                                rows={summary.top_viewed_subjects}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <SimpleTable
                                title="Mais adicionadas"
                                columns={[
                                    { key: "subject_code", label: "Código" },
                                    { key: "total", label: "Vezes", numeric: true },
                                ]}
                                rows={summary.top_added_subjects}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}

export default Metrics;
