import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from "../Atoms/Buttons/Button";

function WarningDialog({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle color="black">Aviso</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Atualmente, você está visualizando a grade obrigatória. 
                    Retorne ao modo de planejamento para arrastar cursos.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default WarningDialog;
