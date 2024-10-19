import React, {useState} from 'react';
import {
  Box, Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog, DialogActions, DialogContent,
  IconButton,
  Stack,
  styled,
  Typography
} from '@mui/material';
import {apiURL} from '../../../constants';
import {User} from '../../../types';
import {LoadingButton} from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface Props {
  id: string;
  user: User | null;
  authorId: string;
  username: string;
  title: string;
  image: string | null;
  onDelete: () => void;
  isDeleting: boolean;
}

const PhotoCard: React.FC<Props> = ({
                                      user,
                                      authorId,
                                      username,
                                      title,
                                      image,
                                      onDelete,
                                      isDeleting
                                    }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
  });

  const cardImage = image ? apiURL + '/' + image : '';

  return (
    <>
      <Box sx={{mt: 3}}>
        {user && (user.role === 'admin' || user._id === authorId) &&
          (<Stack direction="row" justifyContent="space-between" mb={2}>
              <LoadingButton
                type="submit"
                disabled={isDeleting}
                loadingPosition="center"
                variant="outlined"
                color="error"
                sx={{mr: 1}}
                onClick={onDelete}
              >
                <span>Delete</span>
              </LoadingButton>
            </Stack>
          )}
        <Card sx={{
          width: 250,
          m: 1,
          '&:hover': {
            boxShadow: 6,
            transform: 'scale(1.03)',
          },
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}>
          <CardActionArea>
            {image ? (
              <ImageCardMedia image={cardImage} onClick={handleClickOpen}/>
            ) : (
              <Box sx={{height: 0, paddingTop: '100%', backgroundColor: '#fafafa'}}/>
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" textAlign="center">
                {title}
              </Typography>
              <Typography gutterBottom variant="h5" component="div" textAlign="center">
                by {username}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
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
          <img src={cardImage} alt={title}  style={{ width: "80vh" }} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default PhotoCard;