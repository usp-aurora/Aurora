import Dialog from "../Atoms/Dialog/Dialog";
import Button from "../Atoms/Buttons/Button";
import { Typography } from "@mui/material";

function WarningDialog({ open, onClose }) {
    const dialogContent = (
        <Typography>
            Atualmente, você está visualizando a grade obrigatória. 
            Retorne ao modo de planejamento para arrastar cursos.
        </Typography>
    )

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            title={"Visualização de grade obrigatória"}
            content={dialogContent}
            actions={<Button onClick={onClose} variant="contained">OK</Button>}
        />
    );
}

export default WarningDialog;
