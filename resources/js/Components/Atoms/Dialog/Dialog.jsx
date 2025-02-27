import * as React from 'react';
import { styled } from '@mui/material/styles';
import MUIDialog from '@mui/material/Dialog';
import MUIDialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import glassmorphismStyle from "../../../styles/Glassmorphism";

const DialogTitle = styled(MUIDialogTitle)(({ theme }) => ({
  color: theme.palette.primary.neutral,
  padding: theme.spacing(2),
  
  ...theme.typography.h4,
  [theme.breakpoints.up('sm')]: {
    ...theme.typography.h2,
  },
}));

const DialogContainer = styled(MUIDialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    ...glassmorphismStyle(theme, "level3"),
    borderRadius: "12px",
  },

  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: 0
  }
}));

function Dialog({ title, content, actions, open = true, onClose, withCloseButton = true }) {
  return (
    <DialogContainer
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      {withCloseButton && 
        (<IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.white.main,
            })}
          >
          <CloseIcon />
          </IconButton>)}
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </DialogContainer>
  );
}
export default Dialog;