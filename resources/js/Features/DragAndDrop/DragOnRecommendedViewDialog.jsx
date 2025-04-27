import { Typography } from "@mui/material";
import Button from "../../ui/Buttons/Button";
import Dialog from "../../ui/Dialog/Dialog";

function DragOnRecommendedViewDialog({ open, onClose }) {
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

export default DragOnRecommendedViewDialog;
