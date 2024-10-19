import React from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Stack, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {User} from '../../../types';
import {LoadingButton} from '@mui/lab';

interface Props {
  id: string;
  user: User | null;
  authorId: string;
  username: string;
  title: string;
  image: string | null;
  onClick: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const PhotoCard: React.FC<Props> = ({
                                      user,
                                      authorId,
                                      username,
                                      title,
                                      image,
                                      onClick,
                                      onDelete,
                                      isDeleting
                                    }) => {
  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
  });

  const cardImage = image ? apiURL + '/' + image : '';

  return (
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
        <CardActionArea onClick={onClick}>
          {image ? (
            <ImageCardMedia image={cardImage}/>
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

  );
};

export default PhotoCard;