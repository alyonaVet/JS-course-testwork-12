import {Button, Dialog, DialogActions, DialogContent, IconButton, styled} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface Props {
  handleClose: VoidFunction;
  cardImage: string;
  title: string;
  open: boolean;
}

const FullSizePhoto: React.FC<Props> = ({handleClose, cardImage, title, open}) => {
  return(
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon/>
      </IconButton>
      <DialogContent>
        <img src={cardImage} alt={title} style={{width: '80vh'}}/>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
};

export default FullSizePhoto;