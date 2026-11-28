import { Paper, Typography } from "@mui/material";

function StatTile({ label, value, hint }) {
    return (
        <Paper variant="outlined" sx={{ p: 2, minWidth: 160, flex: "1 1 160px" }}>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="h4" component="p" sx={{ fontWeight: 600, my: 0.5, color: "#1F2328" }}>{value}</Typography>
            {hint && <Typography variant="caption" color="text.secondary">{hint}</Typography>}
        </Paper>
    );
}

export default StatTile;
