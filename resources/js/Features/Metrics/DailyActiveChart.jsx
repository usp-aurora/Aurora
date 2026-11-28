import { Box, Tooltip, Typography } from "@mui/material";

const CHART_HEIGHT = 160;

/**
 * Barras de usuários ativos por dia (uma série, sem legenda).
 * Cada barra tem tooltip com os números do dia; a tabela diária abaixo
 * serve como visão acessível dos mesmos dados.
 */
function DailyActiveChart({ daily }) {
    const max = Math.max(1, ...daily.map(d => d.active_users));

    return (
        <Box>
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: "#1F2328" }}>Usuários ativos por dia</Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "2px", height: CHART_HEIGHT, borderBottom: 1, borderColor: "divider" }}>
                {daily.map(d => (
                    <Tooltip
                        key={d.date}
                        arrow
                        title={`${d.date}: ${d.active_users} ativos, ${d.guest_visitors} anônimos, ${d.logins} logins`}
                    >
                        <Box sx={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", cursor: "default" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: `${(d.active_users / max) * 100}%`,
                                    minHeight: d.active_users > 0 ? 2 : 0,
                                    bgcolor: "primary.main",
                                    "&:hover": { opacity: 0.8 },
                                    borderRadius: "4px 4px 0 0",
                                }}
                            />
                        </Box>
                    </Tooltip>
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">{daily[0]?.date}</Typography>
                <Typography variant="caption" color="text.secondary">máx. {max}</Typography>
                <Typography variant="caption" color="text.secondary">{daily[daily.length - 1]?.date}</Typography>
            </Box>
        </Box>
    );
}

export default DailyActiveChart;
