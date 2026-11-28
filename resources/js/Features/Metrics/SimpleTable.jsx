import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

function SimpleTable({ title, columns, rows, empty = "Sem dados no período." }) {
    return (
        <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 420 }}>
            <Typography variant="h6" component="h2" sx={{ px: 2, pt: 2, color: "#1F2328" }}>{title}</Typography>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map(c => (
                            <TableCell key={c.key} align={c.numeric ? "right" : "left"}>{c.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length === 0 && (
                        <TableRow><TableCell colSpan={columns.length}>{empty}</TableCell></TableRow>
                    )}
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            {columns.map(c => (
                                <TableCell key={c.key} align={c.numeric ? "right" : "left"} sx={{ whiteSpace: "nowrap", ...(c.numeric && { fontVariantNumeric: "tabular-nums" }) }}>
                                    {row[c.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SimpleTable;
