import React from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';

interface Props {
  username: string
  title: string;
  image: string | null;
  onClick: () => void;
}

const PhotoCard: React.FC<Props> = ({username, title, image, onClick}) => {
  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
  });

  const cardImage = image ? apiURL + '/' + image : '';

  return (
    <Box sx={{mt: 3}}>
      <Card sx={{
        width: 200,
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