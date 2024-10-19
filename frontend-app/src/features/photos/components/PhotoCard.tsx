import React, {useState} from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Stack, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {User} from '../../../types';
import {LoadingButton} from '@mui/lab';
import {Link, useParams} from 'react-router-dom';
import FullSizePhoto from '../../../UI/Modal/FullSizePhoto';

interface Props {
  id: string;
  user: User | null;
  photoAuthorId: string;
  username: string;
  title: string;
  image: string | null;
  onDelete: () => void;
  isDeleting: boolean;
}

const PhotoCard: React.FC<Props> = ({
                                      user,
                                      photoAuthorId,
                                      username,
                                      title,
                                      image,
                                      onDelete,
                                      isDeleting
                                    }) => {
  const {authorId} = useParams();

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
        {user && (user.role === 'admin' || user._id === photoAuthorId) &&
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
              {
                !authorId &&
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                  by <Link to={`/author/${photoAuthorId}`}>{username}</Link>
                </Typography>
              }

            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <FullSizePhoto handleClose={handleClose} cardImage={cardImage} title={title} open={open}/>
    </>
  );
};

export default PhotoCard;

