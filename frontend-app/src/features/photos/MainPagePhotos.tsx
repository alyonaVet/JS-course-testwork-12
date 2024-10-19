import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectPhotos, selectPhotosFetching} from './photosSlice';
import PhotoCard from './components/PhotoCard';
import {useEffect} from 'react';
import {fetchPhotos} from './photosThunk';

const MainPagePhotos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const photosFetching = useAppSelector(selectPhotosFetching);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <Box sx={{m: 4}}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Users Photo
      </Typography>
      {photosFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} gap={3}>
          {photos.map((photo) => (
            <PhotoCard
              key={photo._id}
              username={photo.user.displayName}
              title={photo.title}
              image={photo.image}
              onClick={() => null}
            />
          ))}
        </Stack>
      )}
    </Box>

  );
};

export default MainPagePhotos;